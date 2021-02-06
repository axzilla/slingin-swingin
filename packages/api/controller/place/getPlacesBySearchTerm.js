// Models
const Place = require('../../models/Place')

async function getPlacesBySearchTerm(req, res) {
  try {
    const { searchTerm } = req.body

    const foundPlaces = await Place.find({ urlSlug: { $regex: searchTerm, $options: 'i' } }).limit(
      5
    )

    res.json(foundPlaces)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlacesBySearchTerm
