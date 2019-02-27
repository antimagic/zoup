import React, { Component } from 'react'
import NProgress from 'nprogress'
import Filters from './components/Filters'
import RestaurantListing from './components/RestaurantListing'
import Zomato from './api/Zomato'

class App extends Component {
  constructor() {
    super()
    this.state = {
      filters: [],
      results: [],
      selected: null,
    }

    this.onFilterChange = this.onFilterChange.bind(this)
    this.onResultSelected = this.onResultSelected.bind(this)
  }

  // when the filters change, query the Zomato API and update
  // the results listing.
  onFilterChange(e) {
    NProgress.start()

    this.setState({ filters: e })
    Zomato.getRestaurants(e).then((res) => {
      this.setState({ results: res.data.restaurants })
      NProgress.done()
    })
  }
  
  // builds a list of RestaurantListing components using the current search results
  formattedResults() {
    return this.state.results.map((res) => {
      return <RestaurantListing key={'res.restaurant.id' + res.restaurant.id} id={res.restaurant.id} name={res.restaurant.name} onSelected={this.onResultSelected} />;
    })
  }

  // populate the details view with content from the current selection
  onResultSelected(selection) {
    NProgress.start()
    Zomato.getRestaurant(selection).then((res) => {
      NProgress.done()
      this.setState({
        selected: res.data,
      })
      console.log(this.state.selected)
    })
  }
  
  render() {
    const selected = this.state.selected
    return (
      <div className="zoup">
        <div className="container">
          <Filters onChange={this.onFilterChange} />
        </div>

        <section className="content__wrapper">
          <div className="container">
            <div className="results">
              <ul className="results__listing">{this.formattedResults()}</ul>
            </div>
            <div className="selected__wrapper">
              {selected !== null && (
                <div className="selected">
                  <h2>{selected.name}</h2>
                  <address>{selected.location.address}</address>
                  <img className="selected__image" src={selected.featured_image}></img>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
