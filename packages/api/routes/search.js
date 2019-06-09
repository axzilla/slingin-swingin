const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
const Profile = require('../models/Profile')

// @route   GET api/search
// @desc    Get Posts and Profiles by Search
// @access  Public
router.get('/:searchText', (req, res) => {
  const searchResult = {
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
      searchResult.posts = [...posts.filter(post => post.published)]
    })
    .then(() =>
      Profile.find()
        .populate('user', ['username', 'isVerified'])
        .then(profiles => {
          searchResult.profiles = profiles.filter(
            profile =>
              ((profile.name &&
                profile.name.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
                (profile.company &&
                  profile.company.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
                (profile.user &&
                  profile.user.username
                    .toUpperCase()
                    .includes(req.params.searchText.toUpperCase()))) &&
              profile.user.isVerified === true
          )
        })
    )
    .then(() => res.json(searchResult))
    .catch(err => console.log(err))
})

module.exports = router
