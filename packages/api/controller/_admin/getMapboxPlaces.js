// Packages
const axios = require('axios')

async function getMapboxPlaces(req, res) {
  try {
    const { search } = req.params

    const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    const token = process.env.MAPBOX_TOKEN
    const limit = '10'
    // const types = 'region,place,locality'
    const mapBox = await axios.get(
      // `${basePath}/${searchTerm}.json?types=${types}&access_token=${token}`
      `${basePath}/${search}.json?&access_token=${token}&limit=${limit}&language=en&fuzzyMatch=true`
    )

    res.json(mapBox.data.features)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getMapboxPlaces
