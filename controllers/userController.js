const {User} =require('../Models/User')
const bcrypt=require('bcryptjs')
const multer=require("multer")
const jwt=require("jsonwebtoken")
const asyncHandler=require("express-async-handler")

//Configuration of multer for file storage
const storage=multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,"public/uploads/") //Store file in uploads folder
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
      }
})

exports.upload=multer({storage})

//Register user
exports.registerUser= asyncHandler(async(req,res,next)=>{
    
    const{firstName,lastName,email,password}=req.body
    const profileImage=req.file

    if(!profileImage){
        return res.status(400).json({
            success:false,
            message: "No file uploaded"
        })
    }

    //Path to the uploaded profile phot
    const profileImagePath=profileImage.path

    //Checking if user exists
    const existingUser= await User.findOne({email})
    if(existingUser){
        return res.status(409).json({
            message:"User already exists"
        })
    }

    //Hashing password
    const salt=await bcrypt.genSalt()
    const hashedPassword= await bcrypt.hash(password,salt)

    //Creating a new user
    const newUser= new User({
        firstName,
        lastName,
        email,
        hashedPassword,
        profileImagePath
    })

    //Saving new user
    await newUser.save()
    res.status(200).json({
        message:"User registered successfully",
        user:newUser
    })

})