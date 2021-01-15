class PlaceUtils {
  constructor(placeReviews) {
    this.placeReviews = placeReviews
  }

  // get average rating per place
  getPlaceSummaries() {
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
}

export default PlaceUtils
