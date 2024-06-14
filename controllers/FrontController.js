const UserModel = require('../models/user')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cloudinary = require('cloudinary').v2
cloudinary.config({
  cloud_name: 'dmhs50pdp', 
  api_key: '211654577373189', 
  api_secret: 'niITexNrWo1TrPkyJeVpK6wTUJU' 
});

class FrontController {

    static home = async (req, res) => {
        try{
            res.render('index',{message:req.flash('success'),msg:req.flash('error')});
        }catch(err){
            console.log(err);
        }
    }

    //Login User
    static login = async (req, res) => {
        try{
            res.render('user/login',{message:req.flash('success'),msg:req.flash('error')});
        }catch(err){
            console.log(err);
        }
    }
    
    // Challenge section
    static challenge= async (req,res)=>{
        try{
           const top= await UserModel.find().sort({score:-1,name:1}).limit(10).exec()
           const bottom=await UserModel.find().sort({score:1,name:1}).limit(1).exec()
        
        
        const LeaderTable= [...top,...bottom];
           res.render('user/challenge', { LeaderTable });
        }catch(err){
            console.log(err,err.message);
            res.status(500).send('An error occurred while fetching leaderboard data.');
        }
    }

    //User Dashboard
    static dashboard = async (req, res) => {
        try{
            const {name,image,email} = req.userData;
            res.render('user/dashboard',{n:name , i:image , e:email, message:req.flash('success'),msg:req.flash('error')});
        }catch(err){
            console.log(err);
        }
    }

    //Policy
    static policy = async (req, res) => {
        try{
            res.render('policy');
        }catch(err){
            console.log(err);
        }
    }

    static userinsert = async (req, res) => {
        try {
            let imageUpload = null; // Set default value for image upload
    
            // To upload Image on Cloud if an image is uploaded
            if (req.files && req.files.image) {
                const file = req.files.image;
                imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'sustainiser'
                });
            }
    
            const { n, e, p, cp } = req.body;
            const user = await UserModel.findOne({ email: e });
    
            if (user) {
                req.flash('error', 'Email Already Exists.');
                res.redirect('/register');
            } else {
                if (n && e && p && cp) {
                    if (p == cp) {
                        const hashPassword = await bcrypt.hash(p, 10);
                        const result = new UserModel({
                            name: n,
                            email: e,
                            password: hashPassword,
                            image: {
                                public_id: imageUpload ? imageUpload.public_id : 'sustainiser/ogjhqekpvgaoknrunb4y',
                                url: imageUpload ? imageUpload.secure_url : 'https://res.cloudinary.com/dmtgrirpq/image/upload/v1709919759/sustainiser/ogjhqekpvgaoknrunb4y.webp'
                            }
                        });
    
                        // To save data
                        const userData = await result.save();
                        res.redirect('/login')
                    } else {
                        req.flash('error', 'Password & Confirm Password must be Same.');
                        res.redirect('/login');
                    }
                } else {
                    req.flash('error', 'All Fields are Required.');
                    res.redirect('/login');
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    static verifyLogin = async (req, res) => {
        try{
            const {email , password} = req.body
            const user = await UserModel.findOne({email:email})
            if(user!=null){
                const isMatch = await bcrypt.compare(password , user.password)
                if(isMatch){
                    // To Generate Token
                    const token = jwt.sign({ ID: user.id }, 'guptchabi@123456');
                    // console.log(token)
                    res.cookie('token',token)
                    req.flash('success','Successfully Logged in.')
                    res.redirect('/')
                }else{
                    req.flash('error','Email or Password is Not Correct.')
                    res.redirect('/login');
                }
            }else{
                req.flash('error','You are not a Registered User.')
                res.redirect('/login');
            }
        }catch(err){
            console.log(err);
        }
    }

    static updateProfile = async (req, res) => {
        try{
            // const {name,image,email,id} = req.userData;
            // console.log(req.body)
            // console.log(req.files.image)
            const { id } = req.userData
            const {name,email} =req.body
            if (req.files) {
                const user = await UserModel.findById(id)
                const imageID = user.image.public_id
                // console.log(imageID)

                //deleting image from Cloudinary
                await cloudinary.uploader.destroy(imageID)
                //new image update
                const imagefile = req.files.image
                const imageupload = await cloudinary.uploader.upload(imagefile.tempFilePath, {
                    folder: 'sustainiser'
                })
                var data = {
                    name: name,
                    email: email,
                    image: {
                        public_id: imageupload.public_id,
                        url: imageupload.secure_url
                    }
                }
            } else {
                var data = {
                    name: name,
                    email: email
                }
            }
            await UserModel.findByIdAndUpdate(id, data)
            req.flash('success', "Profile Updated successfully")
            res.redirect('/dashboard')
        }catch(err){
            console.log(err);
        }
    }
    static changePassword = async (req, res) => {
        try{
            const {id} = req.userData;
            // console.log(req.body);
            const {op , np , cp} = req.body;
            if (op && np && cp) {
                const user = await UserModel.findById(id)
                const isMatched = await bcrypt.compare(op, user.password)
                //console.log(isMatched)
                if (!isMatched) {
                    req.flash('error', 'Current password is incorrect ')
                    res.redirect('/dashboard')
                } else {
                    if (np != cp) {
                        req.flash('error', 'Password and Confirm Password does not match')
                        res.redirect('/dashboard')
                    } else {
                        const newHashPassword = await bcrypt.hash(np, 10)
                        await UserModel.findByIdAndUpdate(id, {
                            password: newHashPassword
                        })
                        req.flash('success', 'Password Updated successfully ')
                        res.redirect('/login')
                    }
                }
            } else {
                req.flash('error', 'All fields are required')
                res.redirect('/dashboard')
            }
        }catch(err){
            console.log(err);
        }
    }

    static logOut = async (req, res) => {
        try{
            res.clearCookie('token');
            req.flash('success','Successfully Logged Out.')
            res.redirect('/')
        }catch(err){
            console.log(err);
        }
    }
}

module.exports = FrontController