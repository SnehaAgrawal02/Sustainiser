const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');

const checkUserAuth = async (req,res,next) => {
    // console.log('Hello Middleware');
    const{token}=req.cookies
    // console.log(token)
    if(!token){
        req.flash('error', 'Unauthorised user please login')
        res.redirect('/login')
    }else{
        const verifyLogin = jwt.verify(token,'guptchabi@123456')
        // console.log(verifyLogin)
        const data = await UserModel.findOne({_id:verifyLogin.ID})
        // console.log(data)
        if(!data) {
            req.flash('error', 'Unauthorised user please login')
            res.redirect('/login')
        }else{
            req.userData = data
            next();
        }
    }
}

module.exports = checkUserAuth;