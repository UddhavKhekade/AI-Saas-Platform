import express from 'express'
import { generateArticle, generateBlogTitle, generateImage } from '../controllers/aicontrollers.js';
import { auth } from '../middlewares/auth.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article' , generateArticle)
// aiRouter.post('/generate-article' ,(req,res)=>{
//     console.log("rooute reached")
//     res.json({message : "article route working"});
// })

aiRouter.post('/generate-blog-title' ,auth, generateBlogTitle)
aiRouter.post('/generate-image' ,auth, generateImage)

export default aiRouter