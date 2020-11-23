const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')
const paginate = require('../middlewares/paginate')
const { Blog } = require('../models')
const { Op } = require("sequelize");

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

// @route    GET api/blog/:blog_id
// @desc     Get a blog by id
// @access   public

router.get('/:blog_id', async (req, res) => {
  try {
    let admin = await Blog.findOne({ where: { id: req.params.blog_id } })
    res.send(admin.dataValues)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

// @route    GET api/blog/search/:tag
// @desc     Get a blog by tag
// @access   public

router.get('/search/:tag', async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where: {
        tag: {
          [Op.substring]: req.params.tag
        }
      }
    });
    res.json(blogs)
  } catch (error) {
    res.status(500).send('Server error')
  }
})

// @route    PUT api/blog/:blog_id
// @desc     Update a blog
// @access   Private
router.put(
  '/:blog_id',
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

    const { tag, title, description, content, featured, updated_at } = req.body
    try {
      const blog = await Blog.update({
        tag,
        title,
        description,
        content,
        featured,
        updated_at
      },
        {
          where: {
            id: req.params.blog_id
          }
        })
      res.json({ success: true, data: blog })
    }
    catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

// @route    DELETE api/blog/:blog_id
// @desc     Delete a blog
// @access   Private
router.delete('/:blog_id', auth, async (req, res) => {
  try {
    const blog = await Blog.destroy({
      where: {
        id: req.params.blog_id
      }
    })
    res.json({ success: true, data: blog })
  }
  catch (error) {
    console.error(error)
    res.status(500).send('Server error')
  }
})

module.exports = router