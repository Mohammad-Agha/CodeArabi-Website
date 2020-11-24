module.exports = model => async (req, res, next) => {
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  const totalBlogs = await model.countBlogs()
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

  results.results = await model.getPaginatedBlogs(startIndex, limit)
  res.paginatedResults = results
  next()
}