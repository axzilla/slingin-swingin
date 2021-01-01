// Packages
const axios = require('axios')

async function getLocations(req, res) {
  try {
    const { searchTerm } = req.body
    const key = process.env.GOOGLE_API_KEY
    const baseUrl = 'https://maps.googleapis.com/maps/api/place'

    // First request to get locations with place_id
    const { data } = await axios.get(
      `${baseUrl}/autocomplete/json?key=${key}&input=${searchTerm}&types=(regions)`
    )

    // Additional requests to get locations with long/lat parameters with help from place_id
    const details = await Promise.all(
      data.predictions.map(async prediction => {
        const details = await axios.get(
          `${baseUrl}/details/json?key=${key}&place_id=${prediction.place_id}`
        )

        return details.data.result
      })
    )

    res.json(details)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getLocations
