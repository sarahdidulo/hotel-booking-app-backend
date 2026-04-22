import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res, next) => {
    const {username, email, password, isAdmin} = req.body;

    if(!username || !email || !password ) {
        return res.json({success: false, message: 'Missing Details'})
    }
    try {
        const existingUser = await User.findOne({email});
        
        if(existingUser) {
            return res.json({ success: false, message: "User already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({username, email, password: hashedPassword, isAdmin});

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // maxAge 7 days exipry time for the cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 
        // })

        res.send({success: true, user_data: newUser});

    } catch (err) {       
        res.status(400).send(`ERROR: ${err}`);
    }
    //check how to handle errors
    //errors from validation in the models are reflected in catch
    // res.send("register page");
}

export const login = async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.json({success: false, message: 'Email and password are required'})
    }

    try {
        const user = await User.findOne({email});
        
        if(!user) {
            return res.json({success: false, message: 'Invalid user email'});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.json({success: false, message: 'Invalid password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // maxAge 7 days exipry time for the cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 
        // })
        // res.setHeader('Access-Control-Allow-Origin','http://localhost:5173')

        return res.json({ success: true, user: user, token: token })

    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}

export const logout = async (req, res, next) => {
    try {
        // res.clearCookie('token', {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        // })

        return res.json({success: true, message: "Logged Out"});

    } catch (err) {
        return res.json({success: false, message: err.message});
    }
}