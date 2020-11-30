const router = require('express').Router()
const auth = require('../middlewares/auth')
const upload = require('../middlewares/multer')
const paginate = require('../middlewares/paginate')
const initializeDB = require('../db')
const fs = require('fs')

const run = async () => {
  const { Image } = await initializeDB()

  // @route    POST api/image
  // @desc     Add an image
  // @access   Private
  router.post('/', auth, (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        return res.send({ msg: err.message })
      }
      if (req.file === undefined) {
        return res.send({ msg: 'No image was given' })
      }
      try {
        const image = await Image.addImage(req.file.filename)
        res.json({ success: true, data: image })
      } catch (error) {
        console.error(error);
        res.status(500).send('Server error')
      }
    })
  })

  // @route    GET api/image
  // @desc     Get all images
  // @access   Private
  router.get('/', [auth, paginate(Image, Image.countImages, Image.getPaginatedImages)], (req, res) => {
    res.json(res.paginatedResults)
  })

  // @route    DELETE api/image
  // @desc     Delete an image
  // @access   Private
  router.delete('/:path', auth, async (req, res) => {
    try {
      const image = await Image.deleteImageByPath(req.params.path)
      fs.unlink(`./public/images/${req.params.path}`, () => {
        return res.json({ success: true, data: image })
      });
    }
    catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })

  // @route    GET api/image/count/all
  // @desc     Get image count
  // @access   Public
  router.get('/count/all', async (req, res) => {
    try {
      const blogs = await Image.countImages()
      res.json({ success: true, data: blogs })
    } catch (error) {
      console.error(error)
      res.status(500).send('Server error')
    }
  })
}
run()

module.exports = router