const express = require('express')

const connectDB = require('./config/db')
const cookieParser = require("cookie-parser")
const cors = require('cors')

require('dotenv').config()

const authRouter = require("./routes/AuthRoutes")
const userRouter = require("./routes/UserRoutes")

connectDB()

const app = express()
app.use(express.json())

const frondend_url = process.env.FRONTEND_URL

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));

app.use(cookieParser())
const port = process.env.PORT || 3001

// router
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);

app.listen(port, () => {
  console.log(`CRM app listening on port ${port}`)
})