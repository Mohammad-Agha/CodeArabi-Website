module.exports = (model, count, getPaginate) => async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  if (!page || !limit) {
    return res.send({ error: 'Page and limit are required' })
  }

  const results = {}

  const totalBlogs = await count()
  results.total = totalBlogs.total

  if (endIndex < totalBlogs.total) {
    results.next = {
      page: page + 1,
      limit
    }
  }

  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
      limit
    }
  }

  results.results = await getPaginate(startIndex, limit)
  res.paginatedResults = results
  next()
}