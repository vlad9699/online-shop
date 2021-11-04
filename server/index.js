import express from 'express'
import dotenv from 'dotenv'
import DB from './db/db.js'
import cors from 'cors'
import fileUplod from 'express-fileupload'
import router from './router/index.js'
import errorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
// import models from './models/models.js'


dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static('uploads'))
app.use(fileUplod({}))
app.use('/api', router)

app.use(errorHandlingMiddleware)

const start = async () => {
  try {
    await DB.authenticate()
    await DB.sync()
    app.listen(PORT, () => {
      console.log(`SERVER WORK ON PORT ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()



