import User from "../models/User.js";

export const userDetails = async (req, res, next) => {
    const id = req.params.id;
    const user_details = await User.find({_id: id}).exec();
    res.json({success: true, data: user_details});
}

export const addProfileDetails = async (req, res, next) => {
    try {
        const firstname = req.body.firstname;
        const middlename = req.body.middlename;
        const lastname = req.body.lastname;
        const email = req.body.email;
        await User.findOne({email}).updateOne({firstname: firstname, middlename: middlename, lastname: lastname});
        const user = await User.findOne({email});
        res.send({success: true, data: user});

    } catch(err) {
        res.send({success: false, error: err});
    }
    
}

export const updateProfile = async (req, res, next) => {
    try {
        let id = req.params.id;
        const filter = {_id : id};
        const update = { 
            firstname: req.body.firstname,
            middlename: req.body.middlename,
            lastname: req.body.lastname,
            avatar: req.body.avatar
        }
        const updatedUser = await User.findOneAndUpdate(filter, update, {
            returnDocument: 'after'
        });
        
        res.json({success: true, user_data: updatedUser});
    } catch (err) { 
        res.status(400).send(`ERROR: ${err}`);
    }
}