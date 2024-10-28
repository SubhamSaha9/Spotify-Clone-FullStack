const cloudinary = require('cloudinary').v2

exports.uploadFileToCloudinary = async (file, folder, type) => {
    const options = { folder };
    options.resource_type = type;

    return await cloudinary.uploader.upload(file.path, options);
}