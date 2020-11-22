const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')
const paginate = require('../middlewares/paginate')
const { Blog } = require('../models')

// @route    POST api/blog
// @desc     Add a blog
// @access   Private
router.post(
  '/',
  [auth,
    [
      check('tag', 'Tag is required').exists(),
      check('title', 'Title is required').exists(),
      check('description', 'Description is required').exists(),
      check('content', 'Content is required').exists(),
      check('featured', 'Featured is required').exists()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { tag, title, description, content, featured, created_at } = req.body
    try {
      const blog = await Blog.create({
        tag,
        title,
        description,
        content,
        featured,
        created_at
      })
      res.json({ success: true, data: blog.dataValues })
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error')
    }

  })

// @route    GET api/blog
// @desc     Get all blogs
// @access   public
router.get('/', paginate(Blog), (req, res) => {
  res.json(res.paginatedResults)
})

module.exports = router