import React, { Component } from 'react'
import Select from 'react-select'
import NProgress from 'nprogress'
import Zomato from '../api/Zomato'

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      cuisines: [],
      rating: [0, 5],
      cost: [1, 4],
      selected: {
        categories: [],
        cuisines: [],
      },
    }

    this.onChange = this.onChange.bind(this)
  }

  componentDidMount() {
    NProgress.start()

    // grab the categories and populate the state
    Zomato.getCategories().then((res) => {
      this.setState({ categories: res.data.categories })
      this.updateLoadingBar()
    })

    Zomato.getCuisines().then((res) => {
      this.setState({ cuisines: res.data.cuisines })
      this.updateLoadingBar()
    })
  }

  updateLoadingBar() {
    if (this.state.categories.length > 0 && this.state.cuisines.length > 0) {
      NProgress.done()
      return
    }

    NProgress.set(0.5)
  }

  // map category API output to label/value for multiselect
  categoryOptions() {
    return this.state.categories.map((res) => {
      const category = res.categories
      return {
        label: category.name,
        value: category.id,
      }
    })
  }
  
  // map cuisine API output to label/value for multiselect
  cuisineOptions() {
    return this.state.cuisines.map((res) => {
      const cuisine = res.cuisine
      return {
        label: cuisine.cuisine_name,
        value: cuisine.cuisine_id,
      }
    })
  }

  // emit a change event including the current filter state
  onChange(options, action) {
    this.state.selected[action.name] = options.map((res) => {
      return res.value
    })

    this.props.onChange(this.state.selected)
  }

  render() {
    return (
      <div className="columns filters">
        <div className="column is-two-thirds">
          <div className="filter filter--category">
            <h2 className="filter__heading">Category</h2>
            <div className="filter__listing">
              <Select isMulti name="categories" options={this.categoryOptions()} onChange={this.onChange} />
            </div>
          </div>
          <div className="filter filter--cuisine">
            <h2 className="filter__heading">Cuisine</h2>
            <div className="filter__listing">
              <Select isMulti name="cuisines" options={this.cuisineOptions()} onChange={this.onChange} />
            </div>
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