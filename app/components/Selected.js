import React, { Component } from 'react'

class Selected extends Component {
  render() {
    const selected = this.props.data
    
    return (
      <div className="selected">
        <div className="columns is-desktop">
          <div className="column selected__image-wrapper">
            <img className="selected__image" src={selected.featured_image}></img>
          </div>

          <div className="column selected__summary">
            <h2>{selected.name}</h2>
            <address>{selected.location.address}</address>
            <ul className="selected__features">
              <li className={selected.has_table_booking ? 'yes' : 'no'}>
                {selected.has_table_booking ? 'Table bookings available' : 'No bookings'}
              </li>
              <li className={selected.is_delivering_now ? 'yes' : 'no'}>
                {selected.is_delivering_now ? 'Delivery available' : 'No delivery available'}
                </li>
            </ul>

            <div className="selected__detail">
              <h3>Cuisines</h3>
              <span>{selected.cuisines}</span>
            </div>

            <div className="selected__detail">
              <h3>More info</h3>
              <span><a href={selected.url} target="_blank" className="selected__link">{selected.name} at Zomato</a></span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Selected