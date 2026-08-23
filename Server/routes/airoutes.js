import express from 'express'
import { generateArticle, generateBlogTitle, generateImage, removeImageBackground, removeImageObject, resumeReview } from '../controllers/aicontrollers.js';
import { auth } from '../middlewares/auth.js';
import { upload } from '../configs/multer.js';

const aiRouter = express.Router();

aiRouter.post('/generate-article' , generateArticle)


aiRouter.post('/generate-blog-title' , generateBlogTitle)

aiRouter.post('/generate-image', generateImage)

aiRouter.post('/remove-image-background',upload.single('image') ,removeImageBackground)

aiRouter.post('/remove-image-object', removeImageObject)

aiRouter.post('/resume-review',upload.single('resume'), resumeReview)

export default aiRouter