import React, { Component } from 'react'
import Select from 'react-select'
import Slider, { Range } from 'rc-slider'
import NProgress from 'nprogress'
import Zomato from '../api/Zomato'

class Filters extends Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      cuisines: [],
      active: {
        categories: [],
        cuisines: [],
        rating: [0, 5],
        cost: [1, 4],
      },
    }

    this.onChange = this.onChange.bind(this)
    this.onSliderChange = this.onSliderChange.bind(this)
  }

  componentDidMount() {
    NProgress.start()

    // grab the categories and populate the state
    Zomato.getCategories().then((res) => {
      this.setState({ categories: res.data.categories })
      this.updateLoadingBar()
    })

    // and the cuisines
    Zomato.getCuisines().then((res) => {
      this.setState({ cuisines: res.data.cuisines })
      this.updateLoadingBar()
    })
  }

  // when we finish loading one of the sets of options,
  // update the loading bar or complete it if they're both done.
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
    this.state.active[action.name] = options.map((res) => {
      return res.value
    })

    this.props.onChange(this.state.active)
  }

  onSliderChange(values, name) {
    this.state.active[name] = values

    this.props.onChange(this.state.active)
  }

  render() {
    const ratingMarks = {
      1: 1,
      5: 5,
    }

    const costMarks = {
      1: '$',
      4: '$$$$',
    }

    return (
      <div className="columns filters">
        <div className="column is-two-thirds">
          <div className="filter filter--category">
            <h3 className="filter__heading">Category</h3>
            <div className="filter__listing">
              <Select isMulti name="categories" options={this.categoryOptions()} onChange={this.onChange} />
            </div>
          </div>
          <div className="filter filter--cuisine">
            <h3 className="filter__heading">Cuisine</h3>
            <div className="filter__listing">
              <Select isMulti name="cuisines" options={this.cuisineOptions()} onChange={this.onChange} />
            </div>
          </div>
        </div>

        <div className="column">
          <div className="filter filter--rating">
            <h3 className="filter__heading">Rating</h3>
            <div className="range-filter__wrapper">
              <Range min={1} max={5} defaultValue={[2, 5]} marks={ratingMarks}
                     onChange={(e) => {this.onSliderChange(e, 'rating')}} />
            </div>
          </div>
          <div className="filter filter--cost">
            <h3 className="filter__heading">Cost</h3>
            <div className="range-filter__wrapper">
              <Range min={1} max={4} defaultValue={[2, 5]} marks={costMarks}
                     onChange={(e) => {this.onSliderChange(e, 'cost')}}/>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Filters