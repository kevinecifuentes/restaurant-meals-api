require('dotenv').config()

const app = require('./app')
const { db } = require('./database/config')

db.authenticate()
  .then(() => console.log('db auth...🫡'))
  .catch((err) => console.log(err))

db.sync()
  .then(() => console.log('db sync...🫡'))
  .catch((err) => console.log(err))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}...🫡`)
})
