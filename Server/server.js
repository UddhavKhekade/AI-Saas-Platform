import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'

const app  = express()
const PORT = process.env.PORT || 3000 ; 

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/',(req,res)=>res.send('Server is live!'))
app.use(requireAuth())

app.listen(PORT , ()=>{
    console.log('Server is running on port',PORT)
})

