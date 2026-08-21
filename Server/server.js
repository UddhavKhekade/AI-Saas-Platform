import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/airoutes.js'
import connectCloudinary from './configs/cloudianry.js'

const app  = express()
const PORT = process.env.PORT || 3000 ; 

await connectCloudinary()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send('MY CURRENT SERVER'))
app.use(requireAuth())
app.use('/api/ai',aiRouter)

app.listen(PORT , ()=>{
    console.log('Server is running on port',PORT)
})

