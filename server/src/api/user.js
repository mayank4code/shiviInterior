const router = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const User = require("../mongodb/Models/User");
const Question = require("../mongodb/Models/Product");
const Order = require("../mongodb/Models/Order");

const fetchPerson = require("../middlewares");

router.get("/authUser" ,fetchPerson , (req ,res)=>{
    res.status(200).json({success: true, message: "successfully used middleware"});
})


//Register
// form validation ->  data store -> token generation -> send in response to client ->store in Localstorage 


router.post("/register",  async(req,res)=>{
    const fields = req.body;
    try{
       // Hash the password
       const hashedPassword = await bcrypt.hash(fields.password, 10); // 10 is the salt rounds

       // Create user with hashed password
       const newUser = await User.create({    // todo create user by refering one one fields
           ...fields, 
           password: hashedPassword
       });  
        //* Have to generate token also
        // token generation - expiry time is 24 hours
        const data = {
            exp: Math.floor(Date.now() / 1000) + 60*60*24,
            mongoID: newUser._id,
            isAdmin: false
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);
        res.status(200).json({success: true, message: "Registered successfully", token});
    } catch(err){
        console.log(err);
        res.status(500).json({success: false, message: "Cannot register", err});
    }
});

//LOGIN
// form validation -> credential check -> token generation -> send token as reponse to client -> store token in Localstorage

router.post("/login", async (req,res)=>{
    try {
        const mobile = req.body.mobile;
        const password = req.body.password;
        let user = await User.findOne({mobile: mobile});

        if(!user){
            return res.status(404).json({success: false, message: "User not found"});
        }

        // comparing Stored Hashed Password and Password 
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        // Password is valid, generate token
        //*User is authenticated, generate token
        // generate token - expiry time is 24 hours
        const data = {
            exp: Math.floor(Date.now() / 1000) + 60*60*24,
            mongoID: user._id,
            isAdmin: user.role===2?true:false
        };
        const token = jwt.sign(data, process.env.JWT_SECRET);

        res.status(200).json({success: true, message: "Logged in successfully", token});

    } catch(err){
        res.status(500).json({success: false, message: err});
    }
})

//* mobile number is already verified through Otp on Client Side
router.post("/update-password", fetchPerson, async (req, res)=>{
    const mobile = req.body.mobile ;
    const newPassword = req.body.password ;

    try {
        // Hash the password
       const newHashedPassword = await bcrypt.hash(fields.password, 10); // 10 is the salt rounds
        const userDoc = await User.findOneAndUpdate({mobile: mobile}, {password: newHashedPassword}, {new: true});

        if(userDoc === null){
            return res.status(404).json({success: false, message: "User not found"});
        }

        res.status(200).json({success: true, message: "User updated successfully", userDoc});

    } catch (error) {
        res.status(500).json({success: false, message: err});
    }

})


module.exports = router;