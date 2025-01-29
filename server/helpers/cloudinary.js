const cloudinary = require("cloudinary")
const multer = require("multer");

cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,
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