const UserModel= require('../models/userModel.JS');


exports.getAllusers=[
    async(req,res)=>{
        try{
            const user= await UserModel.find();
       
            return res.json({status:true,message:user})
        }catch(err){
            return res.json(err)
        }
    }
]
exports.setAllusers=[
    async(req,res)=>{
        try{
            const user = req.body.name;
            return res.json(user)
        }catch(err){
            return res.json(err)
        }
    }
]