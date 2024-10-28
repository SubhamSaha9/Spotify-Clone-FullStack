const Album = require("../models/album");
const { uploadFileToCloudinary } = require("../utils/fileUploader");

exports.addAlbum = async (req, res) => {
    try {
        const { name, desc, bgColor } = req.body;
        const imageFile = req.file;

        if (!name || !desc || !bgColor) {
            return res.status(402).json({
                success: false,
                message: "all fileds are required."
            })
        };

        const uploadedImage = await uploadFileToCloudinary(imageFile, process.env.FOLDER_NAME + "/image", 'image');

        const album = await Album.create({
            name,
            desc,
            bgColor,
            image: uploadedImage.secure_url
        });

        res.status(200).json({
            success: true,
            message: "Album data added successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.getAllAlbums = async (req, res) => {
    try {
        const allAlbums = await Album.find({}).populate("songs");
        res.status(200).json({
            success: true,
            message: "all albums fetched successfully",
            albums: allAlbums
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.deleteAlbum = async (req, res) => {
    try {
        await Album.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: "Album deleted successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}