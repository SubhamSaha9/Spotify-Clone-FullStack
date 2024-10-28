const { uploadFileToCloudinary } = require("../utils/fileUploader");
const Song = require("../models/song");
const Album = require("../models/album");

exports.addSong = async (req, res) => {
    try {
        const { name, desc, album } = req.body;
        const audioFile = req.files.audio[0];
        const imageFile = req.files.image[0];
        if (!name || !desc || !album || !audioFile || !imageFile) {
            return res.status(402).json({
                success: false,
                message: "all fileds are required."
            });
        }
        const uploadedAudio = await uploadFileToCloudinary(audioFile, process.env.FOLDER_NAME + "/audio", "video");
        const uploadedImage = await uploadFileToCloudinary(imageFile, process.env.FOLDER_NAME + "/image", "image");

        const duration = `${Math.floor(uploadedAudio.duration / 60)}:${Math.floor(uploadedAudio.duration % 60)}`

        const songData = await Song.create({
            name,
            desc,
            album,
            image: uploadedImage.secure_url,
            file: uploadedAudio.secure_url,
            duration
        });
        const albumData = await Album.findOneAndUpdate({ name: album }, { $push: { songs: songData._id } });
        res.status(200).json({
            success: true,
            message: "file uploaded successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.listSong = async (req, res) => {
    try {
        const allSongs = await Song.find({});
        res.status(200).json({
            success: true,
            message: "all songs fetched successfully",
            songs: allSongs
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.removeSong = async (req, res) => {
    try {
        await Song.findByIdAndDelete(req.body.id);
        res.status(200).json({
            success: true,
            message: "Song deleted successfully."
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}