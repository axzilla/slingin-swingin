const Profile = require('../../models/Profile')
const Post = require('../../models/Post')

async function search(req, res) {
  try {
    let searchResult = { posts: [], profiles: [] }

    const foundProfiles = await Profile.find().populate('user')
    const foundPosts = await Post.find({
      $or: [
        { title: { $regex: req.params.searchText, $options: 'i' } },
        { text: { $regex: req.params.searchText, $options: 'i' } }
      ]
    }).populate('user', ['name', 'username', 'avatar'])

    searchResult.posts = foundPosts
    searchResult.profiles = foundProfiles.filter(
      profile =>
        (profile.name &&
          profile.name.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
        (profile.company &&
          profile.company.toUpperCase().includes(req.params.searchText.toUpperCase())) ||
        (profile.user &&
          profile.user.username.toUpperCase().includes(req.params.searchText.toUpperCase()))
    )

    res.json(searchResult)
  } catch (error) {
    if (error) throw error
  }
}

module.exports = search
