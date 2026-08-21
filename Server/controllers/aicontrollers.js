
import { OpenAI } from "openai/client.js"
// import { GoogleGenAI } from "@google/genai";
import sql from "../configs/db.js"
import {v2 as cloudinary} from 'cloudinary'
import axios from 'axios'

const AI = new OpenAI({
    apiKey : process.env.GEMINI_API_KEY,
    baseURL : "https://generativelanguage.googleapis.com/v1beta/openai/"
})



export const generateArticle = async (req,res)=>{
    try{
        const {userId} = req.auth()
        const {prompt , length}= req.body
        const plan = req.plan
        const free_usage = req.free_usage


        const response = await AI.chat.completions.create({
            model : "gemini-3.7-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const content = response.choices[0].message.content 

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
        const {userId} = req.auth()
        const {prompt }= req.body
        const plan = req.plan
        const free_usage = req.free_usage


        const response = await AI.chat.completions.create({
            model : "gemini-3.7-flash",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
        });

        const content = response.choices[0].message.content 

        await sql`INSERT INTO creations (user_id,prompt,content,type) 
        VALUES(${userId},${prompt},${content},'BlogTitle')`;


        res.json({success:true , content})
        
    }catch(error){
        console.log(error.message)
        res.json({success : false ,message : error.message })

    }
}

export const generateImage = async (req,res)=>{
    try{
        const {userId} = req.auth()
        const {prompt ,publish}= req.body
        const plan = req.plan
       

        const formData = new FormData()
        formData.append('prompt', prompt)

        
        const {data} = await axios.post("https://clipdrop-api.co/text-to-image/v1",formData,{
          
            headers: {
            'x-api-key': process.env.CLIPDROP_API_KEY,
            },
            responseType : "arraybuffer",
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data).
            toString('base64Image')
        }`
        
        const {secure_url} = await cloudinary.uploader.upload(base64Image)

        await sql`INSERT INTO creations (user_id,prompt,content,type,publish) 
        VALUES(${userId},${prompt},${secure_url},'Image',${publish ?? false})`;


        res.json({success:true ,content: secure_url})
        
    }catch(error){
       console.log("STATUS:", error.response?.status);

        if (error.response?.data) {
            console.log(
                "DATA:",
                Buffer.from(error.response.data).toString("utf8")
            );
        }

        console.log("MESSAGE:", error.message);

        res.json({
            success: false,
            message: error.message
        });

    }
}