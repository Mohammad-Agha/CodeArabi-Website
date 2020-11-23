const express = require('express')
const cors = require('cors')
const db = require('./models')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/admin', require('./routes/admin'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/subs', require('./routes/subs'))

const PORT = process.env.PORT || 5000

// db.sequelize.sync()


// We may need this during development
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// })

app.listen(PORT, console.log(`Server listening on port ${PORT}`))
//hii 