const cloudinary = require("cloudinary")
const multer = require("multer");

cloudinary.config({
    cloud_name : "dr175yj98",
    api_key : "382896367359942",
    api_secret : "zEmm7wKOpag5288q_TGDW3-80zo",
});

const stroage = new multer.memoryStorage();

async function imageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file , {
        resource_type : "auto"
    })
    return result;
}

const upload = multer({stroage})

module.exports = {upload , imageUploadUtil }