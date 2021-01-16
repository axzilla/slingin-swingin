class PlaceUtils {
  constructor(placeReviews) {
    this.placeReviews = placeReviews
  }

  // get average rating per place
  getPlaceRatingSummaries() {
    if (this.placeReviews.length > 0) {
      const summary = this.placeReviews
        .map(placeReview => {
          // get array of values per rating if value (> 0)
          const valuesOfRating = Object.values(placeReview.ratings).filter(value => value)

          // sum up values per rating
          const totalValue = valuesOfRating.reduce((a, b) => a + b)

          // calc average value per rating
          const average = totalValue / valuesOfRating.length
          return average
        })
        // sum up average rating value
        .reduce((a, b) => a + b)

      // calc place average value rating
      const count = this.placeReviews.length
      const average = (summary / this.placeReviews.length).toFixed(1)
      return { count, average }
    }

    return { count: 0, average: 0 }
  }

  // get average rating per item
  getRatingSummaries(ratingName) {
    if (this.placeReviews.length > 0) {
      const filtered = this.placeReviews
        .filter(placeReview => placeReview.ratings[ratingName] !== 0)
        .map(placeReview => placeReview.ratings[ratingName])

      const count = filtered.length
      const average = filtered.reduce((a, b) => a + b, 0) / count || 0

      return { count, average }
    }

    return { count: 0, average: 0 }
  }

  // get average costs per place
  getPlaceCostSummaries() {
    if (this.placeReviews.length > 0) {
      const summary = this.placeReviews
        .map(placeReview => {
          // get array of values per rating if value (> 0)
          const valuesOfCosts = Object.values(placeReview.costs.monthly).filter(value => value)

          // sum up values per rating
          const totalValue = valuesOfCosts.reduce((a, b) => a + b)

          // calc average value per rating
          const average = totalValue / valuesOfCosts.length
          return average
        })
        // sum up average rating value
        .reduce((a, b) => a + b)

      // calc place average value rating
      const count = this.placeReviews.length
      const average = (summary / this.placeReviews.length).toFixed(0)
      return { count, average }
    }

    return { count: 0, average: 0 }
  }

  // get average costs per item
  getCostSummaries(costName, type) {
    if (this.placeReviews.length > 0) {
      const filtered = this.placeReviews
        .filter(placeReview => placeReview.costs[type][costName] !== 0)
        .map(placeReview => placeReview.costs[type][costName])

      const count = filtered.length
      const average = filtered.reduce((a, b) => a + b, 0) / count || 0

      return { count, average }
    }

    return { count: 0, average: 0 }
  }
}

export default PlaceUtils
