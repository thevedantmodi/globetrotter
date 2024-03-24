const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv") /* Maybe not needed */

const userRoute = require("./routes/users.js")
const pinRoute = require("./routes/pins.js")

const app = express();

dotenv.config() /* Maybe not needed */

app.use(express.json())

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Successful connection")
}).catch(err => console.log(err))

app.use("/api/users", userRoute)
app.use("/api/pins", pinRoute)

app.listen(3000, () => {
    console.log("So the backend begins Here we go!")
})


