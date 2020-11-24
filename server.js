const express = require('express')
const cors = require('cors')

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use('/api/admin', require('./routes/admin'))
app.use('/api/blog', require('./routes/blog'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/subs', require('./routes/subs'))
/*helloo world*/
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server listening on port ${PORT}`))