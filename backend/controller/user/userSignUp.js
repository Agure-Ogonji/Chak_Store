const userModel = require("../../models/userModel")
const bcrypt = require('bcryptjs');

async function userSignUpController(req,res){
    try {
        const {email, password, name} = req.body
        const user = await userModel.findOne({email})

        console.log("user", user);
        if (user) {
            throw new Error("USER EXISTS")
        }
        
        console.log("req.body", req.body);
        if (!email) {
            throw new Error("PLEASE PROVIDE AN EMAIL ADDRESS")
        }
        if (!password) {
            throw new Error("PLEASE PROVIDE A PASSWORD")
        }
        if (!name) {
            throw new Error("PLEASE PROVIDE A NAME")
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPasssword = await bcrypt.hashSync(password, salt);

        if (!hashPasssword) {
            throw new Error("SOMETHING IS WRONG")
        }
        const payload = {
            ...req.body,
            role : "GENERAL",
            password : hashPasssword
        }
        const userData = new userModel(payload)
        const saveUser = await userData.save()

        res.status(201).json({
            data : saveUser,
            success : true,
            error : false,
            message : "USER CREATED SUCCESSFULLY"
        })

    } catch (err) {
        res.json({
            message : err.messageerr || err,
            error : true,
            success : false,

        })
    }
}

module.exports = userSignUpController