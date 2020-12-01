const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const auth = require('../middlewares/auth')
const paginate = require('../middlewares/paginate')
const initializeDB = require('../db')

const run = async () => {
  const { Blog } = await initializeDB()

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

      try {
        const blog = await Blog.addBlog(req.body)
        res.json({ success: true, data: blog })
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
      }
    })

  // @route    GET api/blog
  // @desc     Get all blogs
  // @access   public
  router.get('/', paginate(Blog, Blog.countBlogs, Blog.getPaginatedBlogs), (req, res) => {
    console.log(res.paginatedResults);
    res.json(res.paginatedResults)
  })

  // @route    GET api/blog/:blog_id
  // @desc     Get a blog by id
  // @access   public
  router.get('/:blog_id', async (req, res) => {
    try {
      let admin = await Blog.getBlogById(req.params.blog_id)
      res.send(admin)
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
      const blogs = await Blog.getBlogsByTag(req.params.tag)
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

      try {
        const blog = await Blog.updateBlog(req.body, req.params.blog_id)
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
      const blog = await Blog.deleteBlog(req.params.blog_id)
      res.json({ success: true, data: blog })
    }
    catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/blog/featured
  // @desc     Get the 5 featured blogs
  // @access   Public
  router.get('/featured/top', async (req, res) => {
    try {
      const blogs = await Blog.getFeaturedBlogs()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/blog/featured
  // @desc     Get the 5 featured blogs
  // @access   Public
  router.get('/featured/count', async (req, res) => {
    try {
      const blogs = await Blog.getFeaturedBlogsNumber()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/blog/count/all
  // @desc     Get blog count
  // @access   Public
  router.get('/count/all', async (req, res) => {
    try {
      const blogs = await Blog.countBlogs()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })
}

run()


module.exports = router