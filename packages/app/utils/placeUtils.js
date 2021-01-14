import _ from 'lodash'

class PlaceUtils {
  constructor(placeReviews) {
    this.placeReviews = placeReviews

    // clean up placeReview array and left just rating categories
    this.cleanedRatings = _.cloneDeep(this.placeReviews).map(placeReview => {
      delete placeReview.__v
      delete placeReview._id
      delete placeReview.dateCreated
      delete placeReview.place
      delete placeReview.summary
      delete placeReview.user
      return placeReview
    })
  }

  // get average rating per place
  getPlaceSummaries() {
    if (this.placeReviews.length > 0) {
      const summary = this.cleanedRatings
        .map(rating => {
          // get array of values per rating if value (> 0)
          const valuesOfRating = Object.values(rating).filter(value => value)

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
      const filtered = this.cleanedRatings
        .filter(item => item[ratingName] !== 0)
        .map(item => item[ratingName])

      const count = filtered.length
      const average = filtered.reduce((a, b) => a + b, 0) / count || 0

      return { count, average }
    }

    return { count: 0, average: 0 }
  }
}

export default PlaceUtils
