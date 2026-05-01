

import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// tell multer to upload to cloudinary
const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "course_thumbnails",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
    },
});

const uploadImages = multer({ storage });

export default uploadImages;