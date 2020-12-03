const router = require('express').Router()
const bcrypt = require('bcryptjs')
const auth = require('../middlewares/auth')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const initializeDB = require('../db')
require('dotenv/config')



const run = async () => {
  const { Admin } = await initializeDB()

  // @route    GET api/admin
  // @desc     Get admin by token
  // @access   Private
  router.get('/', auth, async (req, res) => {
    try {
      const admin = await Admin.getAdminById(req.admin.id)
      res.json(admin);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

  // @route    POST api/admin
  // @desc     Authenticate admin & get token
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
        let admin = await Admin.getAdminByUsername(username)
        if (!admin) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const isMatch = await bcrypt.compare(password, admin.password);

        if (!isMatch) {
          return res
            .status(400)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }

        const payLoad = {
          admin: {
            id: admin.id
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

}
run()



module.exports = router