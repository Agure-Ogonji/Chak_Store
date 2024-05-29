const bcrypt = require('bcryptjs')
const userModel = require('../../models/userModel')
const jwt = require('jsonwebtoken')
async function userSignInController(req,res){

    try {
        const {email, password} = req.body

        if (!email) {
            throw new Error("PLEASE PROVIDE AN EMAIL")
        }
        if (!password) {
            throw new Error("PLEASE PROVIDE A PASSWORD")
        }

        const user = await userModel.findOne({email})
        
        if (!user) {
            throw new Error("USER NOT FOUND")
        }

        const checkPassword = await bcrypt.compare(password, user.password)
        console.log("checkPassword", checkPassword);

        if (checkPassword) {
            const tokenData = {
                _id : user._id,
                email : user.email,
            }
            const token = await jwt.sign(
                tokenData, process.env.TOKEN_SECRET_KEY, {expiresIn: 60 * 60 * 8})

            const tokenOption = {
                httpOnly : true,
                secure : true
            }
            res.cookie("token", token, tokenOption).status(200).json({
                message : "LOGIN SUCCESSFULLY",
                data : token,
                success : true,
                error : false
            })
            
        }else{
            throw new Error("PLEASE CHECK PASSWORD")
        }
    } catch (err) {
        res.json({
            message : err.message || err,
            error : true,
            success : false,
        })
    }
}

module.exports = userSignInController