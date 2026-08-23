import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async ()=>{
    cloudinary.config({
        cloud_name :process.env.CLOUDINARY_CLOUD_NAME  ,
        api_key : process.env.CLOUDINARY_API_KEY ,
        api_secret: process.env.CLOUDINARY_API_SECRET 
    })

    console.log({

        cloud_name :process.env.CLOUDINARY_CLOUD_NAME ? "loaded" : "not loaded",
        api_key : process.env.CLOUDINARY_API_KEY ? "loaded" : "not loaded",
        api_secret: process.env.CLOUDINARY_API_SECRET ? "loaded" : "not loaded"
    })

};

export default connectCloudinary;