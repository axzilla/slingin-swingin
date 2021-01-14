// Models
const Place = require('../../models/Place')

async function getPlaceByShortId(req, res) {
  try {
    const { shortId } = req.params
    const foundPlace = await Place.findOne({ shortId })
    res.json(foundPlace)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getPlaceByShortId
