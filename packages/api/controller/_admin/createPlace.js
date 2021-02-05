// Models
const Place = require('../../models/Place')

// Utils
const cloudinary = require('../../utils/cloudinary')
const slugify = require('../../utils/slugify')

async function createPlace(req, res) {
  try {
    const { mapBox, photo } = req.body
    const foundPlace = await Place.findOne({ 'mapBox.id': mapBox.id })

    if (foundPlace) {
      return res.status(400).json('Place already exist!')
    }

    const uploadedPhoto = await cloudinary.v2.uploader.upload(photo, {
      folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
      public_id: `${slugify(mapBox.place_name)}`
    })

    const createdPlace = await Place.create({
      mapBox,
      urlSlug: slugify(mapBox.place_name)
    })

    createdPlace.photo = uploadedPhoto
    createdPlace.save()

    res.json(createdPlace)
  } catch (error) {
    if (error) {
      console.error(error) // eslint-disable-line
      return res.status(500).json('Error, please try it again!')
    }
  }
}

module.exports = createPlace
