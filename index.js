const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const sequelize = require('./util/database')
const cookieParser = require('cookie-parser')

dotenv.config()
const app = express()
const router = require('./routes/index')

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(cors())

router(app)

app.listen(8000, () => {
    console.log('Server is running')
})


sequelize.sync()


//AUTHENTICAION: so sánh pass với database
//AUTHORIZATION: phân quyền

