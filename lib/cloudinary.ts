import { v2 as cloudinary } from 'cloudinary';

/** 2023/06/07 - 이미지 cloudinary setting  - by leekoby */
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true,
});

export default cloudinary;
