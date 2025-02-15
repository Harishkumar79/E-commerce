const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

// register
const registerUser = async (req, res) => {
    const { userName, email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email });
        if (checkUser) return res.json({ success: false, message: "User with this email already exits! Please try again" })

        const hashPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            userName,
            email,
            password: hashPassword
        })

        await newUser.save();
        res.status(200).json({
            success: true,
            message: "Register successfully"
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        });
    }
}

// login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        const checkUser = await User.findOne({ email });
        if (!checkUser) return res.json({ success: false, message: "User doesn't exists!" })

        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password);
        if (!checkPasswordMatch) return res.json({
            success: false,
            message: "Incorrect password! Please try again",
        })

        // token generation
        const token = jwt.sign({
            id: checkUser._id,
            role: checkUser.role,
            email: checkUser.email,
            userName: checkUser.userName
        }, 'CLIENT_SECRET_KEY', { expiresIn: '60m' });

        // res.cookie('token', token, { httpOnly: true, secure: true }).json({
        //     success: true,
        //     message: "Logged in sucessfully",
        //     user: {
        //         email: checkUser.email,
        //         role: checkUser.role,
        //         id: checkUser._id,
        //         userName : checkUser.userName
        //     }
        // })

        res.status(200).json({
            success: true,
            message: "Logged in sucessfully",
            token,
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        })

    } catch (e) {
        console.log(e);
        res.status(500).json({
            success: false,
            message: "some error occured"
        });
    }
}


// logout
const logOut = async (req, res) => {
    res.clearCookie('token').json({
        success: true,
        message: "Logged out sucessfully"
    })
}


// middleware

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1] ;

    if (!token) return res.json({
        success: false,
        message: "Unauthorised user!"
    })

    try {
        const decodedToken = jwt.verify(token, 'CLIENT_SECRET_KEY');
        // console.log(decodedToken);
        req.user = decodedToken;
        next();
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Unauthorised user!"
        })
    }
}

// const authMiddleware = async (req, res, next) => {
//     const token = req.cookies.token;

//     if (!token) return res.json({
//         success: false,
//         message: "Unauthorised user!"
//     })

//     try {
//         const decodedToken = jwt.verify(token, 'CLIENT_SECRET_KEY');
//         // console.log(decodedToken);
//         req.user = decodedToken;
//         next();
//     } catch (e) {
//         res.status(401).json({
//             success: false,
//             message: "Unauthorised user!"
//         })
//     }
// }

module.exports = { registerUser, loginUser, logOut, authMiddleware };