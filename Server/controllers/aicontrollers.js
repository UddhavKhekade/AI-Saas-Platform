
import { GoogleGenAI } from "@google/genai";
import sql from "../configs/db.js"
import {v2 as cloudinary} from 'cloudinary'
import { InferenceClient } from "@huggingface/inference";
import axios from 'axios'
import connectCloudinary from "../configs/cloudianry.js";
import fs from 'fs'
import {PDFParse} from 'pdf-parse'


const AI = new GoogleGenAI({
    apiKey : process.env.GEMINI_API_KEY,
    
    
})



export const generateArticle = async (req,res)=>{
    try{
        console.log("GENERATE ARTICLE CONTROLLER REACHED");

        const { userId } = req.auth();

        console.log("USER ID:", userId);
        const {prompt , length}= req.body
        // const plan = req.plan
        // const free_usage = req.free_usage

        console.log("Calling Gemini...");
        const response = await AI.interactions.create({
            model : "gemini-3.5-flash-lite",
            input : prompt
        });

        console.log("Gemini response received");

        const content = response.output_text 

        await sql`INSERT INTO creations (user_id,prompt,content,type) 
        VALUES(${userId},${prompt},${content},'article')`;


        res.json({success:true , content})
        
    }catch(error){
        console.log(error.message)
        res.json({success : false ,message : error.message })

    }
}


export const generateBlogTitle = async (req,res)=>{
    try{
        console.log("GENERATE ARTICLE CONTROLLER REACHED");

        const { userId } = req.auth();

        console.log("USER ID:", userId);
        const {prompt , length}= req.body
        // const plan = req.plan
        // const free_usage = req.free_usage

        console.log("Calling Gemini...");
        const response = await AI.interactions.create({
            model : "gemini-3.5-flash-lite",
            input : prompt
        });

        console.log("Gemini response received");

        const content = response.output_text 

        await sql`INSERT INTO creations (user_id,prompt,content,type) 
        VALUES(${userId},${prompt},${content},'article')`;


        res.json({success:true , content})
        
    }catch(error){
        console.log(error.message)
        res.json({success : false ,message : error.message })

    }
}




export const generateImage = async (req, res) => {
    try {
        const { prompt , publish } = req.body;
        const {userId} = req.auth()

        // 1. Generate image using Hugging Face
        const client = new InferenceClient(
            process.env.HUGGING_FACE_API_KEY
        );

        const imageBlob = await client.textToImage({
            provider: "nscale",
            model: "black-forest-labs/FLUX.1-schnell",
            inputs: prompt
        });

        console.log("Hugging Face image generated");

        // 2. Convert Blob → Buffer
        const buffer = Buffer.from(
            await imageBlob.arrayBuffer()
        );

        console.log("Image converted to Buffer");

        // 3. Upload Buffer → Cloudinary
        const result = await new Promise((resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                {
                    resource_type: "image"
                },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            );

            uploadStream.end(buffer);
        });

        const secure_url = result.secure_url
        console.log("Cloudinary URL:", result.secure_url);

        await sql`INSERT INTO creations (user_id,prompt,content,type,publish) 
        VALUES(${userId},${prompt},${secure_url},'Image',${publish ?? false})`;


        // 4. Send URL to frontend
        res.json({
            success: true,
            content: result.secure_url
        });

    } catch (error) {
        console.log("ERROR:", error);

        res.json({
            success: false,
            message: error.message
        });
    }


    
};


export const removeImageBackground = async (req,res)=>{
    try{
        const {userId} = req.auth()

        if (!req.file) {
            return res.json({success: false, message: 'Please upload an image'})
        }

        const {secure_url} = await cloudinary.uploader.upload(req.file.path , {
            transformation :[
                {
                    effect : 'background_removal',
                    background_removal : 'remove_the_background'
                }
            ]
        })

        await sql`INSERT INTO creations (user_id,prompt,content,type,publish) 
        VALUES(${userId},'remove background from image',${secure_url},'Image',false)`;

        res.json({success : true , content : secure_url})
    }catch(error){
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
        
};

export const removeImageObject = async (req,res)=>{
    try{
        const {userId} = req.auth()
        const {object} = req.body ?? {}
        const image = req.file

        if (!image || !object) {
            return res.json({success: false, message: 'Please upload an image and specify an object'})
        }

        const {public_id} = await cloudinary.uploader.upload(image.path )

        const imageUrl =  cloudinary.url(public_id , {
            transformation : [{effect:`gen_remove:${object}`}],
            resource_type : 'image'

        })


        await sql`INSERT INTO creations (user_id,prompt,content,type) 
        VALUES(${userId},${`Removed ${object} from image`},${imageUrl},'Image')`;

        res.json({success : true , content : imageUrl})
    }catch(error){
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
        
};


export const resumeReview = async (req,res)=>{
    try{
        const {userId} = req.auth()
       
        const resume= req.file;

        

        if(resume.size > 5 * 1024 * 1024){
            return res.json({success:true ,
                message : "Resume file size exceeds 5MB size"
            })
        }

       const dataBuffer = fs.readFileSync(resume.path)

        const parser = new PDFParse({ data: dataBuffer })
        const result = await parser.getText()

        const pdfText = result.text

        await parser.destroy()

        const prompt = `Review the following resume and provide constructive 
        feedback on its strenghts, weakness and areas for improvement. Resume 
        Content :\n\n${pdfText}`

        const response = await AI.interactions.create({
            model : "gemini-3.5-flash-lite",
            input : prompt
        });


        const content = response.output_text 


        await sql`INSERT INTO creations (user_id,prompt,content,type) 
        VALUES(${userId},'Review the uploaded resume',${content},'Resume Review')`;

        res.json({success : true , content })
    }catch(error){
        console.log(error.message)
        res.json({success : false , message : error.message})
    }
        
};