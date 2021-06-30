const Place = require('../../models/Place')

async function getAllPlaces(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const { searchText } = req.query

    if (limit <= 100) {
      const result = await Place.find(
        searchText && { urlSlug: { $regex: searchText, $options: 'i' } }
      )
        // .sort({ dateCreated: -1 })
        .limit(limit)
        .skip(page > 0 ? (page - 1) * limit : 0)

      const total = searchText
        ? await Place.countDocuments({ urlSlug: { $regex: searchText, $options: 'i' } })
        : await Place.estimatedDocumentCount()

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

module.exports = getAllPlaces
