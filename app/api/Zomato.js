import axios from 'axios'

// helpers for interacting with the Zomato API
class Zomato {
  constructor() {
    // TODO: load key from a .env
    this.apiKey = '4ded29a4fc887490fefc33a94bd72d02'
    this.baseUrl = 'https://developers.zomato.com/api/v2.1/'
    // TODO: use location services to determine location, api accepts lat lng
    this.cityId = 297
  }

  get(endpoint, params = {}) {
    const headers = {
      'user-key': this.apiKey,
    }

    return axios.get(`${this.baseUrl}${endpoint}`, {
      headers,
      params,
    })
  }

  // returns a complete list of categories from Zomato's /categories endpoint
  getCategories() {
    return this.get('categories')
  }
  
  getCuisines() {
    return this.get('cuisines', {
      city_id: this.cityId,
    })
  }

  getRestaurants(filters) {
    return this.get('search', {
      entity_id: this.cityId,
      entity_type: 'city',
      category: filters.categories.join(','),
      cuisines: filters.cuisines.join(','),
    })
  }

  getRestaurant(id) {
    return this.get('restaurant', {
      res_id: id,
    })
  }
}

export default new Zomato