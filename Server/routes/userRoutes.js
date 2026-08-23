import express from 'express'
import { getPublishCreation, getUserCreations, toggleLikeCreation } from '../controllers/usercontroller.js'

const userRouter = express.Router()

userRouter.get('/get-user-creations',getUserCreations)
userRouter.get('/get-published-creations',getPublishCreation)
userRouter.post('/toggle-like-creation',toggleLikeCreation)

export default userRouter;