import React, { Component } from 'react'
import NProgress from 'nprogress'
import jump from 'jump.js'
import Filters from './components/Filters'
import RestaurantListing from './components/RestaurantListing'
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

    if (Object.keys(this.state.filters).length === 0) {
      return 'No filters selected'
    }

    return 'No results'
  }

  // when the filters change, query the Zomato API and update
  // the results listing.
  onFilterChange(e) {
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
    const selected = this.state.selected

    return (
      <div className="zoup">
        <Filters onChange={this.onFilterChange} />

        <section className="content__wrapper columns">
          <div className="column is-one-third-tablet results">
            <h3 className="results__heading">{this.getResultsHeading()}</h3>
            <ul className="results__listing">{this.formattedResults()}</ul>
          </div>

          <div className={'column selected__wrapper' + (selected !== null ? ' active' : ' empty')}>
            {selected !== null && (
            <div className="selected">
              <div className="columns is-desktop">
                <div className="column selected__image-wrapper">
                  <img className="selected__image" src={selected.featured_image}></img>
                </div>

                <div className="column selected__summary">
                  <h2>{selected.name}</h2>
                  <address>{selected.location.address}</address>
                  <ul className="selected__features">
                    <li className={selected.has_table_booking ? 'yes' : 'no'}>
                      {selected.has_table_booking ? 'Table bookings available' : 'No bookings'}
                    </li>
                    <li className={selected.is_delivering_now ? 'yes' : 'no'}>
                      {selected.is_delivering_now ? 'Delivery available' : 'No delivery available'}
                      </li>
                  </ul>

                  <div className="selected__detail">
                    <h3>Cuisines</h3>
                    <span>{selected.cuisines}</span>
                  </div>

                  <div className="selected__detail">
                    <h3>More info</h3>
                    <span><a href={selected.url} target="_blank" className="selected__link">{selected.name} at Zomato</a></span>
                  </div>
                </div>
              </div>
            </div>
            )}
          </div>
        </section>
      </div>
    )
  }
}

export default App
