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

        // const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        // maxAge 7 days exipry time for the cookie
        // res.cookie('token', token, {
        //     httpOnly: true,
        //     secure: process.env.NODE_ENV === 'production',
        //     sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
        //     maxAge: 7 * 24 * 60 * 60 * 1000 
        // })
        // res.setHeader('Access-Control-Allow-Origin','http://localhost:5173')

        const accessToken = jwt.sign({
            email: email
        }, process.env.JWT_ACCESS_SECRET, {
            expiresIn: '10m'
        });

        const refreshToken = jwt.sign({
            email: email,
            username: user.username
        }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '1h'
        });

         // Assigning refresh token in http-only cookie 
        res.cookie('jwtRefresh', refreshToken, {
            httpOnly: true,
            sameSite: 'None', 
            secure: true,
            maxAge: 3600000
        });

        return res.json({ success: true, accessToken: accessToken })

    } catch (err) {
        return res.json({success: false, message: err.message})
    }
}

export const verifyToken = async (req, res, next) => {
    const accessToken = req.headers['authorization'].split(' '); /* resuls in an array*/
    const refreshToken = req.cookies.jwtRefresh;

    if(accessToken[1] && accessToken[1] != '') {
        jwt.verify(accessToken[1], process.env.JWT_ACCESS_SECRET, (err) => {
            if(err) {
                console.log(err, "access token expired");
                /*
                - access token: expired
                - to check refresh token
                */
                
                jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err) => {
                    if(err) {
                        console.log(err, "refresh token expired");
                        /* 
                        - access token: expired
                        - refresh token: expired
                        - generate new access and refresh tokens
                        */

                        const refreshToken = jwt.sign({
                            email: email,
                            username: user.username
                        }, process.env.JWT_REFRESH_SECRET, {
                            expiresIn: '1h'
                        });
                        
                        res.cookie('jwtRefresh', refreshToken, {
                            httpOnly: true,
                            sameSite: 'None', 
                            secure: true,
                            maxAge: 3600000
                        });

                        const accessToken = jwt.sign({
                            email: email
                        }, process.env.JWT_ACCESS_SECRET, {
                            expiresIn: '10m'
                        });

                        console.log('generated new access and refresh tokens')
                        next();
                    } else {
                        /* 
                            - access token: expired
                            - refresh token: not expired
                            - to generate new access token
                        */

                        const accessToken = jwt.sign({
                            email: email
                        }, process.env.JWT_ACCESS_SECRET, {
                            expiresIn: '10m'
                        });

                        console.log('access token has expired. generated a new access token')

                        next();
                    }
                })
            } else {
                //access token has not yet expired
                console.log('Access token has not yet expired.')
                next();
            }
        })
    } else {
        //access token here is blank or undefined
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