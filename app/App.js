import React, { Component } from 'react'
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
  }

  // when the filters change, query the Zomato API and update
  // the results listing.
  onFilterChange(e) {
    this.setState({ filters: e })
    Zomato.getRestaurants(e).then((res) => {
      console.log(res)
      this.setState({ results: res.data.restaurants })
    })
  }

  onResultSelected(selection) {
    console.log(selection)
  }

  formattedResults() {
    return this.state.results.map((res) => {
      return <RestaurantListing key={'res.restaurant.id' + res.restaurant.id} id={res.restaurant.id} name={res.restaurant.name} onSelected={this.onResultSelected} />;
    })
  }

  render() {
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
            <div className="selected"></div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
