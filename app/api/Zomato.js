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
  
  // a complete list of cuisines available within a city via /cuisines endpoint
  getCuisines() {
    return this.get('cuisines', {
      city_id: this.cityId,
    })
  }

  // retrieve list of restaurants against a supplied filter query
  getRestaurants(filters) {
    return this.get('search', {
      entity_id: this.cityId,
      entity_type: 'city',
      category: filters.categories.join(','),
      cuisines: filters.cuisines.join(','),
    }).then((res) => {
      // since the API won't let us filter by rating or cost,
      // process the list after the fact.
      // TODO: we could store the master list and if only the sliders change,
      // just filter it again - we don't need to make an api call since this
      // filter takes place on our end
      let filtered = res.data.restaurants.filter((r) => {
        const targetRating = filters.rating
        const rating = Math.round(r.restaurant.user_rating.aggregate_rating)
        const ratingMatches = rating >= targetRating[0] && rating <= targetRating[1]

        const targetCost = filters.cost
        const cost = r.restaurant.price_range
        const costMatches = cost >= targetCost[0] && cost <= targetCost[1]

        if (ratingMatches && costMatches) {
          return true;
        }

        return false;
      })
      return filtered
    })
  }

  getRestaurant(id) {
    return this.get('restaurant', {
      res_id: id,
    })
  }
}

export default new Zomato