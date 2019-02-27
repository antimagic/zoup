import React, { Component } from 'react'
import Filters from './components/Filters'

class App extends Component {
  constructor() {
    super()
    this.state = {
      categories: [],
      cuisines: [],
      results: [],
      selected: null,
    }
  }

  // when the filters change, query the Zomato API and update
  // the results listing.
  onFilterChange(e) {
    console.log(e)
  }

  render() {
    return (
      <div className="zoup">
        <div className="container">
          <Filters onChange={this.onFilterChange} />
        </div>

        <section className="content__wrapper">
          <div className="container">
            <div className="results"></div>
            <div className="selected"></div>
          </div>
        </section>
      </div>
    )
  }
}

export default App
