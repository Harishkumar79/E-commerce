const Feature = require("../../models/Feature");


const addFeatureImage = async(req , res) => {
    try {

        const {image} = req.body;

        const featuresImages = new Feature({
            image
        })

        await featuresImages.save();

        res.status(201).json({
            success: true,
            data : featuresImages
        })
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

const getFeatureImages = async(req , res) => {
    try {

        const images = await Feature.find({})

        res.status(201).json({
            success: true,
            data : images
        })
        
    } catch (error) {
        console.log('error', error);
        res.status(500).json({
            success: false,
            message: "Some error occured!"
        })
    }
}

module.exports = {addFeatureImage , getFeatureImages}