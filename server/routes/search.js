const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Profile = require('../models/Profile')

// Get Posts and Profiles by Search

router.get('/:searchText', (req, res) => {
  let searchResult = {
    posts: [],
    profiles: []
  }
  Post.find({
    $or: [
      { title: { $regex: req.params.searchText, $options: 'i' } },
      { text: { $regex: req.params.searchText, $options: 'i' } }
    ]
  })
    .populate('user', ['name', 'username', 'avatar'])
    .then(posts => {
      searchResult.posts = posts
    })
    .then(() =>
      Profile.find()
        .populate('user')
        .then(profiles => {
          searchResult.profiles = profiles.filter(
            profile =>
              (profile.name &&
                profile.name.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
              (profile.company &&
                profile.company.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
              (profile.user &&
                profile.user.username.toUpperCase().includes(req.params.searchText.toUpperCase()))
          )
        })
    )
    .then(() => res.json(searchResult))
    .catch(err => console.log(err)) // eslint-disable-line no-console
})

module.exports = router
