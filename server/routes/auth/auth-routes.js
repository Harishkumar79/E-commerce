const express = require("express");
const {registerUser , loginUser , logOut , authMiddleware} = require("../../controllers/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logOut);
router.get("/check-auth" , authMiddleware , (req , res) =>{
    //decoded user
    const user = req.user;
    res.status(200).json({
        success : true,
        message : "Authenticated users !",
        user,
    })
})

module.exports = router;