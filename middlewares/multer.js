const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = `${file.fieldname}-${Date.now()}-${file.originalname}`
    cb(null, uniqueSuffix)
  }
})

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    let ext = path.extname(file.originalname)
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
      return cb(new Error('Only images are allowed'))
    }
    return cb(null, true)
  }
}).single('image')

module.exports = upload