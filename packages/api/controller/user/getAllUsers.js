const User = require('../../models/User')

async function getAllUsers(req, res) {
  try {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const { q } = req.query

    if (limit <= 100) {
      const result = await User.find(
        // IS ACTIVE IS MISSING
        q && {
          $or: [{ name: { $regex: q, $options: 'i' } }, { username: { $regex: q, $options: 'i' } }]
        }
      )
        .select('-password')
        .populate('locationCurrent')
        .populate('locationFrom')
        .sort({ dateCreated: -1 })

      const total = q
        ? await User.countDocuments({
            $or: [
              { name: { $regex: q, $options: 'i' } },
              { username: { $regex: q, $options: 'i' } }
            ]
          })
        : await User.estimatedDocumentCount()

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

module.exports = getAllUsers
