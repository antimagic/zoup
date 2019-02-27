import React, { Component } from 'react'
import Zomato from '../api/Zomato'

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      cuisines: [],
      rating: [0, 5],
      cost: [1, 4],
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    // grab the categories and populate the state
    Zomato.getCategories().then((res) => {
      console.log(res.data.categories)
      this.setState({ categories: res.data.categories })
    })

    Zomato.getCuisines().then((res) => {
      console.log(res.data.cuisines)
      this.setState({ cuisines: res.data.cuisines })
    })
  }

  // render each category in the state as a <li> element
  // using 'category-{id}' as the key and the name as the element content
  categoryList() {
    return this.state.categories.map((cat) => {
      return <li key={'category-' + cat.categories.id}>{cat.categories.name}</li>;
    })
  }

  cuisinesList() {
    return this.state.cuisines.map((res) => {
      const cuisine = res.cuisine
      return <li key={'cuisine-' + cuisine.cuisine_id}>{cuisine.cuisine_name}</li>
    })
  }

  onChange(e) {
    this.props.onChange(e.target)
  }

  render() {
    return (
      <div className="columns filters">
        <div className="column is-two-thirds">
          <div className="filter filter--category">
            <h2 className="filter__heading">Category</h2>
            <ul className="filter__listing">{ this.categoryList() }</ul>
          </div>
          <div className="filter filter--cuisine">
            <h2 className="filter__heading">Cuisine</h2>
            <ul className="filter__listing">{ this.cuisinesList() }</ul>
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
    )
  }
}

export default Filters