// Packages
const Scraper = require('images-scraper')

// Models
const Place = require('../../models/Place')

// Utils
const cloudinary = require('../../utils/cloudinary')
const slugify = require('../../utils/slugify')

async function placeCreate(req, res) {
  try {
    const { location } = req.body

    const foundLocation = await Place.findOne({ 'mapBox.id': location.id })

    if (foundLocation) {
      return res.status(400).json('Location already exist!')
    }

    const google = new Scraper({
      puppeteer: { headless: true, args: ['--no-sandbox'] },
      tbs: { isz: 'l' }
    })

    const photoResults = await google.scrape(location.place_name, 2)

    const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
      folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
      public_id: `${slugify(location.place_name)}`
    })

    const createdLocation = await Place.create({
      mapBox: location,
      urlSlug: slugify(location.place_name)
    })

    createdLocation.photo = uploadedPhoto
    createdLocation.save()

    res.json(createdLocation)
  } catch (error) {
    if (error) {
      console.error(error) // eslint-disable-line
      return res.status(500).json('Error, please try it again!')
    }
  }
}

module.exports = placeCreate
