const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs');

const app = express()

const dir = './public/images';

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/', express.static(path.join(__dirname, 'public/images')));
app.use('/api/admin', require('./routes/admin'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/subs', require('./routes/subs'))
app.use('/api/image', require('./routes/image'))
app.use('/api/social', require('./routes/social'))

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening on port ${PORT}`))