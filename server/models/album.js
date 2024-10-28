const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true
    },
    bgColor: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    songs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "Song",
        }
    ]
});

module.exports = mongoose.model("Album", albumSchema);