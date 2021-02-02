const Post = require('../../models/Post')

async function getAllPosts(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const { searchText } = req.query

    if (limit <= 100) {
      const result = await Post.find(
        searchText && {
          $or: [
            { title: { $regex: searchText, $options: 'i' } },
            { content: { $regex: searchText, $options: 'i' } },
            { tags: { $regex: searchText, $options: 'i' } }
          ]
        }
      )
        .populate('user', '-password')
        .populate('location')
        .sort({ isPinned: -1 })
        .sort({ dateCreated: -1 })

      const total = searchText
        ? await Post.countDocuments({
            $or: [
              { title: { $regex: searchText, $options: 'i' } },
              { content: { $regex: searchText, $options: 'i' } },
              { tags: { $regex: searchText, $options: 'i' } }
            ]
          })
        : await Post.estimatedDocumentCount()

      const pages = Math.ceil(total / limit) || 1
      const size = result.length
      const from = (page - 1) * limit
      const to = limit * page - (limit - size)

      const data = {
        from,
        to,
        total,
        page,
        pages,
        size,
        result,
        limit
      }

      res.json({ ...data })
    } else {
      const data = { total: 0, page: 0, pages: 0, size: 0, result: [], limit: 0 }
      res.json({ ...data })
    }
  } catch (error) {
    if (error) throw error
  }
}

module.exports = getAllPosts
