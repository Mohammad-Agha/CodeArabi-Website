const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const initializeDatabse = require('../db')
const auth = require('../middlewares/auth')
const paginate = require('../middlewares/paginate')

const run = async () => {
  const { Sub } = await initializeDatabse()

  // @route    GET api/subs
  // @desc     Get all subscribers
  // @access   Private
  router.get('/', [auth, paginate(Sub, Sub.countSubs, Sub.getPaginatedSubs)], async (req, res) => {
    res.json(res.paginatedResults)
  })

  // @route    POST api/subs
  // @desc     Add a subscriber
  // @access   Public
  router.post('/',
    [check('email', 'Email is required').exists(),
    check('email', 'Email is not valid').isEmail()]
    , async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const sub = await Sub.addSub(req.body)
        res.json({ success: true, data: sub })
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
      }
    })

  // @route    GET api/subs/:email
  // @desc     Get a subscriber
  // @access   Public
  router.get('/:email', async (req, res) => {
    try {
      let sub = await Sub.getSubByEmail(req.params.email)
      res.send(sub)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/subs/:email
  // @desc     Get a subscriber
  // @access   Public
  router.get('/email/all', auth, async (req, res) => {
    try {
      let sub = await Sub.getAllSubs()
      res.send(sub)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/subs/count/all
  // @desc     Get subs count
  // @access   Public
  router.get('/count/all', async (req, res) => {
    try {
      const blogs = await Sub.countSubs()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })
}

run()


module.exports = router