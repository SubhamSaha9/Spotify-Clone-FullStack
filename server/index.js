require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const cors = require("cors");

const { cloudinaryConnect } = require("./config/cloudinary");
const { connect } = require("./config/database");
const songRoutes = require("./routes/song");
const albumRoutes = require("./routes/album");

// connect db
connect();

// connect cloud
cloudinaryConnect();

app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/song", songRoutes);
app.use("/api/v1/album", albumRoutes);

// testing
app.get("/", (req, res) => {
    return res.json({
        success: true,
        message: "Your server is up and running ...",
    });
});



app.listen(port, () => {
    console.log(`app is listening to port ${port}`);
})