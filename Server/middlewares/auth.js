

//Middleware to check userId

import { clerkClient } from "@clerk/express";//allows your backend to communicate with clerk

export const auth = async (req , res ,next)=>{//middleware function
    try{
        const {userId , has} = await req.auth();//gets authentication info from clerk


        const user = await clerkClient.users.getUser(userId)//give info about user

        if(user.privateMetadata.free_usage){//check if user free_usage in metadata
            req.free_usage = user.privateMetadata.free_usage
        }else{
            await clerkClient.users.updateUserMetadata(userId , {
                privateMetadata : {
                    free_usage : 0
                }
            })
            req.free_usage = 0
        }

        req.plan = 'free'
        next()//to go next route or middleware

    }catch(error){
        res.json({success : false , message : error.message})

    }

}