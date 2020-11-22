const router = require('express').Router()
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const { Admin } = require('../models')
require('dotenv/config')

/**
 * @route    GET api/auth
 * @desc     Get user by token
 * @access   Private
 */

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('username', 'Username is required').exists(),
    check('password', 'Password is required').exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { username, password } = req.body;

    try {
      let admin = await Admin.findOne({ where: { username: username } })
      if (!admin) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, admin.dataValues.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payLoad = {
        admin: {
          id: admin.dataValues.id
        }
      }
      jwt.sign(payLoad, process.env.SECRET, (err, token) => {
        if (err) throw err
        res.json({ token })
      })

    } catch (error) {
      console.error(error.message)
      res.status(500).send('Server error')
    }

  })

module.exports = router