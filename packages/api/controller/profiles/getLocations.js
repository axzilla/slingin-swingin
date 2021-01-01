const axios = require('axios')

async function getLocations(req, res) {
  try {
    const { searchTerm } = req.body
    const key = process.env.GOOGLE_API_KEY

    const { data } = await axios.get(
      `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${key}&input=${searchTerm}&types=(regions)`
    )

    res.json(data)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getLocations
