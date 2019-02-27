import React, { Component } from 'react'

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

  componentDidMount() {
    //
  }

  render() {
    return (
      <div className="zoup">
        <div className="container">
            <div className="columns filters">
              <div className="column is-two-thirds">
                <div className="filter filter--category">
                  <h2 className="filter__heading">Category</h2>
                  <ul className="filter__listing"></ul>
                </div>
                <div className="filter filter--cuisine">
                  <h2 className="filter__heading">Cuisine</h2>
                  <ul className="filter__listing"></ul>
                </div>
              </div>

              <div className="column">
                <div className="filter filter--rating">
                  <h2 className="filter__heading">Rating</h2>
                </div>
                <div className="filter filter--cost">
                  <h2 className="filter__heading">Cost</h2>
                </div>
              </div>
            </div>
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
