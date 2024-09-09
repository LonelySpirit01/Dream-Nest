const mongoose=require("mongoose")
const validator=require("validator")
const userSchema= new mongoose.Schema({

    firstName:{
        type:String,
        required:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[2,"Name cannot be less than 2 characters"]
    },
    lastName:{
        type:String,
        required:true,
        maxLength:[30,"Name cannot exceed 30 characters"],
        minLength:[2,"Name cannot be less than 2 characters"]
    },
    email:{
        type:String,
        required:true,
        validate:[validator.isEmail, "Provide valid Email"],
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Password should contain atleast 8 characters"]
    },
    profileImagePath:{
        type:String,
        default:""
    },
    tripList:{
        type:Array,
        default:[]
    },
    wishList:{
        type:Array,
        default:[]
    },
    propertyList:{
        type:Array,
        default:[]
    },
    reservationList:{
        type:Array,
        default:[]
    },  
},{
    timestamps:true
})

module.exports=mongoose.model("User",userSchema)