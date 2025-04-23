require('dotenv').config();

const express = require('express')
const connectDB = require("./config/database.js")
const app = express()
const cors = require("cors")
const PORT = process.env.PORT || 7777;

const cookieParser = require('cookie-parser')

app.use(cors({
    origin: 'https://devtinderfull.netlify.app',
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser())

const authRouter = require('../src/routes/auth.js')
const profileRouter = require("../src/routes/profile.js")
const requestRouter = require("../src/routes/request.js")
const userRouter = require("../src/routes/user.js")

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)
app.use("/", userRouter)
 

connectDB()
.then(() => {
    console.log("Database connection is established..") ,
    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}..`);
    });
})
.catch((err) => {
    console.error("Database connection is not established")
})




