module.exports = model => async (req, res, next) => {
  if (!req.query.page || !req.query.limit) {
    return res.status(400).send({ Error: 'Page and Limit should be given' })
  }
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  const startIndex = (page - 1) * limit
  const endIndex = page * limit

  const results = {}

  const length = await model.count()

  results.total = length

  if (endIndex < length) {
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

  const blogs = await model.findAll({
    offset: startIndex,
    limit: limit
  })

  results.results = []
  blogs.forEach(data => results.results.push(data.dataValues))

  res.paginatedResults = results
  next()
}