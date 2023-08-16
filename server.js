const express = require("express")
const cors = require("cors")
const {userController} = require("./routes/user.routes")
const {connection} =  require("./congfig/db")
const app = express();
const port = 8080;

app.use(express.json())

app.get("/",(req , res) => {
    res.send("home page")
})
 app.use(cors())

app.use("/user", userController)

app.listen(port , async ()=>{
try {
    await connection;
    console.log("Connected to DB")
} catch (error) {
    console.log("Error connecting to DB");

    console.log(error)
}

    console.log(`listening on port ${port} `)
})