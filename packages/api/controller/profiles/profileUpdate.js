// Packages
const axios = require('axios')

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

    // handle locationFrom
    if (!isEmpty(req.body.locationFrom)) {
      const query = { 'mapBox.id': req.body.locationFrom.mapBox.id }
      const foundLocationFrom = await Place.findOne(query)

      // if locationFrom is not found
      if (!foundLocationFrom) {
        // 1. create place in DB
        const createdLocation = await Place.create({ mapBox: req.body.locationFrom.mapBox })

        // 2. get data with photo reference by google api
        const basePath = 'https://maps.googleapis.com/maps/api/place'
        const input = createdLocation.mapBox.text
        const key = process.env.GOOGLE_API_KEY
        const fields = 'photos,formatted_address,name,rating,opening_hours,geometry'
        const google = await axios.get(
          `${basePath}/findplacefromtext/json?input=${slugify(
            input
          )}&inputtype=textquery&fields=${fields}&key=${key}`
        )

        const photoReference = google.data.candidates[0].photos[0].photo_reference
        const height = google.data.candidates[0].photos[0].height
        const width = google.data.candidates[0].photos[0].width

        if (photoReference) {
          // 3. get photo via photo reference by google api
          const photo = await axios.get(
            `${basePath}/photo?maxwidth=${width}&maxheight${height}=&photoreference=${photoReference}&key=${key}`,
            { responseType: 'arraybuffer' } // binary to buffer
          )

          // 4. upload photo to cloudinary
          const base64 = Buffer.from(photo.data, 'binary').toString('base64') // buffer to base64
          const uploadStr = 'data:image/jpeg;base64,' + base64 // base64 to cloudinary upload format

          const uploadedPhoto = await cloudinary.v2.uploader.upload(uploadStr, {
            folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
            public_id: `place-${createdLocation._id}`
          })

          // 5. save upload photo to place
          createdLocation.photo = uploadedPhoto
          createdLocation.save()
        }

        profile.locationFrom = createdLocation._id
      } else {
        // if locationFrom is found
        profile.locationFrom = foundLocationFrom._id
      }
    }

    // handle locationCurrent
    if (!isEmpty(req.body.locationCurrent)) {
      const query = { 'mapBox.id': req.body.locationCurrent.mapBox.id }
      const foundLocationCurrent = await Place.findOne(query)

      // if locationCurrent is not found
      if (!foundLocationCurrent) {
        // 1. create place in DB
        const createdLocation = await Place.create({
          mapBox: req.body.locationCurrent.mapBox
        })

        // 2. get data with photo reference by google api
        const basePath = 'https://maps.googleapis.com/maps/api/place'
        const input = createdLocation.mapBox.text
        const key = process.env.GOOGLE_API_KEY
        const fields = 'photos,formatted_address,name,rating,opening_hours,geometry'
        const google = await axios.get(
          `${basePath}/findplacefromtext/json?input=${slugify(
            input
          )}&inputtype=textquery&fields=${fields}&key=${key}`
        )

        const photoReference = google.data.candidates[0].photos[0].photo_reference

        if (photoReference) {
          // 3. get photo via photo reference by google api
          const photo = await axios.get(
            `${basePath}/photo?maxwidth=400&photoreference=${photoReference}&key=${key}`,
            { responseType: 'arraybuffer' } // binary to buffer
          )

          // 4. upload photo to cloudinary
          const base64 = Buffer.from(photo.data, 'binary').toString('base64') // buffer to base64
          const uploadStr = 'data:image/jpeg;base64,' + base64 // base64 to cloudinary upload format

          const uploadedPhoto = await cloudinary.v2.uploader.upload(uploadStr, {
            folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
            public_id: `place-${createdLocation._id}`
          })

          // 5. save upload photo to place
          createdLocation.photo = uploadedPhoto
          createdLocation.save()
        }

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
