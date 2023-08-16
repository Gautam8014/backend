const {Router}= require("express")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")
require("dotenv").config()




const {UserModel} = require("../models/User.model")
const userController=Router();


userController.post("/signup", (req, res)=>{

    const {email, password, username}= req.body

    bcrypt.hash(password, 3, async function(err, hash) {
        const new_user = new UserModel({
            
            email,
            password : hash,
            username
        })
        try{
            await new_user.save()
            res.json({msg : "sign up successfull"})
        }
        catch(err){
            console.log(err)
            res.status(500).send("something went wrong, please try again later")
        }
    });
   
})



userController.post("/login", async (req, res)=>{
    const {email, password} = req.body; //elon@123
    const user = await UserModel.findOne({email})
    if(!user){
        res.send("Sign up first")
    }
    else{
        const hashed_password = user.password
        bcrypt.compare(password, hashed_password, function(err, result) {
            if(result){
                let token = jwt.sign({user_id : user._id}, process.env.SECRET_KEY);
                res.send({msg : "login successfull", token : token})
            }
            else{
                res.send("Login failed, invalid credentials")
            }
        });
    }
})


module.exports={
    userController
}