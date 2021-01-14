// Packages
const Scraper = require('images-scraper')

// Models
const Profile = require('../../models/Profile')
const Place = require('../../models/Place')

// Validation
const validateProfile = require('../../validation/validateProfile')

// Utils
const isEmpty = require('../../utils/isEmpty')
const cloudinary = require('../../utils/cloudinary')
const slugify = require('../../utils/slugify')

async function profileUpdate(req, res) {
  try {
    const { errors } = validateProfile(req.body)

    if (!isEmpty(errors)) {
      return res.status(400).json(errors)
    }

    const profile = { ...req.body }

    if (!isEmpty(req.body.locationFrom)) {
      const query = { 'mapBox.id': req.body.locationFrom.mapBox.id }
      const foundLocationFrom = await Place.findOne(query)

      if (!foundLocationFrom) {
        const createdLocation = await Place.create({
          mapBox: req.body.locationFrom.mapBox,
          urlSlug: slugify(req.body.locationFrom.mapBox.place_name)
        })

        const input = createdLocation.mapBox.place_name
        const google = new Scraper({ puppeteer: { headless: true }, tbs: { isz: 'l' } })
        const results = await google.scrape(input, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(results[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `${createdLocation.urlSlug}-${createdLocation._id}`
        })

        createdLocation.photo = uploadedPhoto
        createdLocation.save()
        profile.locationFrom = createdLocation._id
      } else {
        profile.locationFrom = foundLocationFrom._id
      }
    }

    if (!isEmpty(req.body.locationCurrent)) {
      const query = { 'mapBox.id': req.body.locationCurrent.mapBox.id }
      const foundLocationCurrent = await Place.findOne(query)

      if (!foundLocationCurrent) {
        const createdLocation = await Place.create({
          mapBox: req.body.locationCurrent.mapBox,
          urlSlug: slugify(req.body.locationCurrent.mapBox.place_name)
        })

        const input = createdLocation.mapBox.place_name
        const google = new Scraper({ puppeteer: { headless: true }, tbs: { isz: 'l' } })
        const results = await google.scrape(input, 2)

        const uploadedPhoto = await cloudinary.v2.uploader.upload(results[0].url, {
          folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
          public_id: `place-${createdLocation.urlSlug}-${createdLocation._id}`
        })

        createdLocation.photo = uploadedPhoto
        createdLocation.save()
        profile.locationCurrent = createdLocation._id
      } else {
        profile.locationCurrent = foundLocationCurrent._id
      }
    }

    const updatedProfile = await Profile.findOneAndUpdate({ user: req.user.id }, profile, {
      new: true
    })
      .populate('locationFrom')
      .populate('locationCurrent')

    res.json(updatedProfile)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = profileUpdate
