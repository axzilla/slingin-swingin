// Packages
const Scraper = require('images-scraper')

// Models
const User = require('../../models/User')
const Place = require('../../models/Place')

// Validation
const validateProfile = require('../../validation/validateProfile')

// Utils
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')
const slugify = require('../../utils/slugify')

async function updateUser(req, res) {
  try {
    const { locationFrom, locationCurrent } = req.body
    const { errors } = validateProfile(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const profile = { ...req.body }

    if (!isEmpty(locationFrom)) {
      const foundLocationFrom = await Place.findOne({ 'mapBox.id': locationFrom.mapBox.id })

      if (!foundLocationFrom) {
        const google = new Scraper({
          puppeteer: { headless: true, args: ['--no-sandbox'] },
          tbs: { isz: 'l' }
        })

        const photoResults = await google.scrape(locationFrom.mapBox.place_name, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `${slugify(locationFrom.mapBox.place_name)}`
        })

        const createdLocation = await Place.create({
          mapBox: locationFrom.mapBox,
          urlSlug: slugify(locationFrom.mapBox.place_name)
        })

        createdLocation.photo = uploadedPhoto
        createdLocation.save()
        profile.locationFrom = createdLocation._id
      } else {
        profile.locationFrom = foundLocationFrom._id
      }
    }

    if (!isEmpty(locationCurrent)) {
      const foundLocationCurrent = await Place.findOne({ 'mapBox.id': locationCurrent.mapBox.id })

      if (!foundLocationCurrent) {
        const google = new Scraper({
          puppeteer: { headless: true, args: ['--no-sandbox'] },
          tbs: { isz: 'l' }
        })

        const photoResults = await google.scrape(locationCurrent.mapBox.place_name, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `${slugify(locationCurrent.mapBox.place_name)}`
        })

        const createdLocation = await Place.create({
          mapBox: locationCurrent.mapBox,
          urlSlug: slugify(locationCurrent.mapBox.place_name)
        })

        createdLocation.photo = uploadedPhoto
        createdLocation.save()
        profile.locationCurrent = createdLocation._id
      } else {
        profile.locationCurrent = foundLocationCurrent._id
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user._id, profile, {
      new: true
    })
      .populate('locationFrom')
      .populate('locationCurrent')

    res.json(updatedUser)
  } catch (error) {
    console.error(error) // eslint-disable-line
    return res.status(500).json({ other: 'Error, please try it again!' })
  }
}

module.exports = updateUser
