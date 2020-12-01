const router = require('express').Router()
const auth = require('../middlewares/auth')
const initializeDatabse = require('../db')

const run = async () => {
  const { Social } = await initializeDatabse()

  // @route    GET api/social
  // @desc     Get social media links
  // @access   Public
  router.get('/', async (req, res) => {
    try {
      let social = await Social.getSocial()
      if (social) {
        res.json({ success: true, data: social })
      }
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    PUT api/social
  // @desc     Update social media links
  // @access   Public
  router.put('/', auth, async (req, res) => {
    try {
      const sub = await Social.updateSocial(req.body)
      res.json({ success: true, data: sub })
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error')
    }
  })
}

run()

module.exports = router