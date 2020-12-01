const router = require('express').Router()
const { check, validationResult } = require('express-validator')
const initializeDatabse = require('../db')
const auth = require('../middlewares/auth')
const paginate = require('../middlewares/paginate')

const run = async () => {
  const { Contact } = await initializeDatabse()

  // @route    GET api/contact
  // @desc     Get all contacts
  // @access   Private
  router.get('/', [auth, paginate(Contact, Contact.countContacts, Contact.getPaginatedContacts)], async (req, res) => {
    res.json(res.paginatedResults)
  })

  // @route    POST api/Contacts
  // @desc     Add a Contactscriber
  // @access   Public
  router.post('/',
    [check('name', 'Name is required').exists(),
    check('title', 'Title is required').exists(),
    check('email', 'Email is not valid').exists().isEmail(),
    check('body', 'Body is required').exists()]
    , async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const contact = await Contact.addContact(req.body)
        res.json({ success: true, data: contact })
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
      }
    })

  // @route    GET api/contact/:contact)id
  // @desc     Get a contact
  // @access   Private
  router.get('/:contact_id', auth, async (req, res) => {
    try {
      let contact = await Contact.getContactById(req.params.contact_id)
      res.send(contact)
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/contact/count/all
  // @desc     Get contact count
  // @access   Public
  router.get('/count/all', async (req, res) => {
    try {
      const blogs = await Contact.countContacts()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })
}

run()


module.exports = router