// Packages
const axios = require('axios')

async function getMapboxPlaces(req, res) {
  try {
    const { search } = req.params

    const basePath = 'https://api.mapbox.com/geocoding/v5/mapbox.places'
    const token = process.env.MAPBOX_TOKEN
    const limit = '10'
    const types = 'region,place,locality,neighborhood'
    // const types = 'country,region,place,locality'
    const mapbox = await axios.get(
      `${basePath}/${search}.json?types=${types}&access_token=${token}&limit=${limit}&language=en`
      // `${basePath}/${search}.json?&access_token=${token}&limit=${limit}&language=en`
    )

    res.json(mapbox.data.features)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getMapboxPlaces
