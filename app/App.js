import React, { Component } from 'react'
import NProgress from 'nprogress'
import jump from 'jump.js'
import Filters from './components/Filters'
import RestaurantListing from './components/RestaurantListing'
import Selected from './components/Selected'
import Zomato from './api/Zomato'

class App extends Component {
  constructor() {
    super()
    this.state = {
      filters: {},
      results: [],
      selected: null,
      isSearching: false,
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onResultSelected = this.onResultSelected.bind(this)
  }

  getResultsHeading() {
    if (this.state.isSearching) {
      return 'Searching...'
    }

    if (this.state.results.length > 0) {
      return 'Results'
    }

    if (Object.keys(this.state.filters).length === 0 ||
        (this.state.filters.categories.length === 0 && this.state.filters.cuisines.length === 0)) {
      return 'No filters selected'
    }

    return 'No results'
  }

  // when the filters change, query the Zomato API and update
  // the results listing.
  onFilterChange(e) {
    // if there's no categories or cuisines selected, reset to an empty state
    if (e.categories.length === 0 && e.cuisines.length === 0) {
      this.setState({
        filters: e,
        results: [],
        selected: null,
      })
      return;
    }

    NProgress.start()
    this.setState({
      filters: e,
      isSearching: true,
      selected: null,
    })

    Zomato.getRestaurants(e).then((res) => {
      this.setState({ results: res })
      NProgress.done()
      this.setState({
        isSearching: false,
      })
    })
  }
  
  // builds a list of RestaurantListing components using the current search results
  formattedResults() {
    return this.state.results.map((res) => {
      return <RestaurantListing
              key={'res.restaurant.id' + res.restaurant.id}
              data={res.restaurant}
              isSelected={this.state.selected !== null && this.state.selected.id === res.restaurant.id}
              onSelected={this.onResultSelected} />
    })
  }

  // populate the details view with content from the current selection
  onResultSelected(selection) {
    this.setState({
      selected: selection,
    })

    // when stacked, bring the user down to their selection
    if (document.documentElement.clientWidth < 769) {
      jump('.selected__wrapper', {
        duration: 300,
      })
    }
  }
  
  render() {
    const isSelected = this.state.selected !== null
    return (
      <div className="zoup">
        <Filters onChange={this.onFilterChange} />

        <section className="content__wrapper columns">
          <div className="column is-one-third-tablet results">
            <h3 className="results__heading">{this.getResultsHeading()}</h3>
            <ul className="results__listing">{this.formattedResults()}</ul>
          </div>

          <div className={'column selected__wrapper' + (isSelected ? ' active' : ' empty')}>
            {isSelected && (
              <Selected data={this.state.selected} />
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default App
