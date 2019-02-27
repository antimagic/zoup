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
    this.props.onSelected(this.props.id)
  }

  render() {
    return (
      <li><a href="#" onClick={this.onClick}>{this.props.name}</a></li>
    )
  }
}

export default RestaurantListing