import React, { Component } from 'react'

class RestaurantListing extends Component {
  constructor(props) {
    super(props)

    this.onClick = this.onClick.bind(this)
  }
  
  onClick(e) {
    // prevent scroll position jumping
    e.preventDefault()

    // emit selection event when this listing's clicked and pass the id through
    this.props.onSelected(this.props.data)
  }

  render() {
    return (
      <li className="results__item">
        <a className={this.props.isSelected ? 'is-selected' : ''} href="#" onClick={this.onClick}>
          <span>{this.props.data.name}</span>
        </a>
      </li>
    )
  }
}

export default RestaurantListing