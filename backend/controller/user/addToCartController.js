const addToCartModel = require("../../models/cartProduct")
const mongoose = require("mongoose")


const addToCartController = async(req,res)=>{
    try {
        const {productId} = req?.body
        const currentUser = req.userId
        // const {productId} = req.params

        // const isProductAvailable = await addToCartModel.findOne(new mongoose.Types.ObjectId(productId))
        const isProductAvailable = await addToCartModel.findOne({productId})

        // const isProductAvailable1 = await addToCartModel.findOne({productId: req.body.productId}).exec()

        console.log("isProductAvailable ", isProductAvailable);

        if(isProductAvailable) {
            return res.json({
                message : "ALREADY EXISTS IN CART",
                success : false,
                error : true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser
        }
        const newAddToCart = new addToCartModel(payload)
        const saveProduct = await newAddToCart.save()
        
        return res.json({
            data : saveProduct,
            message : "PRODUCT ADDED TO CART",
            success : true,
            error : false
        })
    } catch (err) {
        res.json({
            message : err?.message || err,
            error : true,
            success : false
        })
    }
}

module.exports = addToCartController