const express =require('express')
const cors = require('cors')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const userRouter = require('./routes/user.routes')
const authRouter = require('./routes/auth.routs')

const PORT = process.env.PORT || 8000

const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())

app.use('/api', authRouter)
app.use('/', userRouter)

app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
    
})