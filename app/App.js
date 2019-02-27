import React, { Component } from 'react'
import Zomato from './api/zomato'

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
    // grab the categories and populate the state
    Zomato.getCategories().then((res) => {
      console.log(res.data.categories)
      this.setState({
        categories: res.data.categories
      })
    })
  }

  // render each category in the state as a <li> element
  // using 'category-{id}' as the key and the name as the element content
  categoryList() {
    return this.state.categories.map((cat) => {
      return <li key={'category-' + cat.categories.id}>{cat.categories.name}</li>;
    })
  }

  render() {
    return (
      <div className="zoup">
        <div className="container">
            <div className="columns filters">
              <div className="column is-two-thirds">
                <div className="filter filter--category">
                  <h2 className="filter__heading">Category</h2>
                  <ul className="filter__listing">{ this.categoryList() }</ul>
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
