const PolicyModel = require('../models/policy');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dmhs50pdp', 
    api_key: '211654577373189', 
    api_secret: 'niITexNrWo1TrPkyJeVpK6wTUJU' 
});

class PolicyController {
    static addPolicy = async (req, res) => {
        try {
            let imageUpload = null;

            if (req.files && req.files.image) {
                const file = req.files.image;
                imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
                    folder: 'policies'
                });
            }

            const { link, name, description, advantages } = req.body;

            const newPolicy = new PolicyModel({
                image: {
                    public_id: imageUpload ? imageUpload.public_id : 'policies/default',
                    url: imageUpload ? imageUpload.secure_url : 'https://res.cloudinary.com/your-cloud-name/image/upload/vdefault/policies/default.jpg'
                },
                link,
                name,
                description,
                advantages: advantages || []
            });

            await newPolicy.save();
            res.redirect('/policy');
        } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }

    static addComment = async (req, res) => {
        try {
            const { policyId, user, text } = req.body;
            const policy = await PolicyModel.findById(policyId);

            if (!policy) {
                console.log('Policy not found');
            }

            const newComment = {
                user,
                text
            };

            policy.comments.push(newComment);
            await policy.save();

            res.redirect('/policy');
        } catch (err) {
            console.error(err);
        }
    }
}

module.exports = PolicyController;