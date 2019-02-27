import axios from 'axios'

// helpers for interacting with the Zomato API
class Zomato {
  constructor() {
    // TODO: load key from a .env
    this.apiKey = '4ded29a4fc887490fefc33a94bd72d02'
    this.baseUrl = 'https://developers.zomato.com/api/v2.1/'
  }

  get(endpoint) {
    const headers = {
      'user-key': this.apiKey,
    }

    return axios.get(`${this.baseUrl}${endpoint}`, {
      headers,
    })
  }

  // returns a complete list of categories from Zomato's /categories endpoint
  getCategories() {
    return this.get('categories')
  }
  
  getCuisines() {
    return this.get('cuisines')
  }
}

export default new Zomato