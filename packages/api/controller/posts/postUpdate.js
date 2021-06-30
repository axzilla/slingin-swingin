// Models
const Post = require('../../models/Post')
// const Place = require('../../models/Place')

async function postUpdate(req, res) {
  try {
    const { contentRaw, contentText, hashtags, mediaFiles, gif, place } = req.body
    // let place = !isEmpty(JSON.parse(req.body.place)) ? JSON.parse(req.body.place) : null

    // if (!isEmpty(place)) {
    //   const foundPlace = await Place.findOne({ 'mapBox.id': place.mapBox.id })
    //   if (!foundPlace) {
    //     const google = new Scraper({
    //       puppeteer: { headless: true, args: ['--no-sandbox'] },
    //       tbs: { isz: 'l' }
    //     })

    //     const photoResults = await google.scrape(place.mapBox.place_name, 2)

    //     const uploadedPhoto = await cloudinary.v2.uploader.upload(photoResults[0].url, {
    //       folder: process.env.CLOUDINARY_PATH_PLACE_PHOTO,
    //       public_id: `${slugify(place.mapBox.place_name)}`
    //     })

    //     const createdPlace = await Place.create({
    //       mapBox: place.mapBox,
    //       urlSlug: slugify(place.mapBox.place_name)
    //     })

    //     createdPlace.photo = uploadedPhoto
    //     createdPlace.save()
    //     place = createdPlace._id
    //   } else {
    //     place = foundPlace._id
    //   }
    // }

    const updatedPost = await Post.findByIdAndUpdate(
      req.body._id,
      {
        user: req.user._id,
        contentRaw,
        contentText,
        hashtags,
        mediaFiles,
        gif,
        place,
        dateUpdated: Date.now()
      },
      { new: true }
    )
      .populate('bookmarks', ['email', 'username'])
      .populate('user')
      .populate('mediaFiles')

    res.json(updatedPost)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = postUpdate
