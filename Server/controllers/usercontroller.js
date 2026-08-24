import sql from "../configs/db.js"

export const getUserCreations = async(req , res)=>{
    try{

        const {userId} = req.auth()

        const creations = await sql`SELECT * FROM creations WHERE user_id=${userId} ORDER BY created_at DESC`
        
        res.json({success : true , creations})
    }catch(error){
        res.json({success : false , message : error.message})

    }
}

export const getPublishCreation = async(req , res)=>{
    try{

        

        const creations = await sql`SELECT * FROM creations WHERE publish = true ORDER BY created_at DESC`
        
        res.json({success : true , creations})
    }catch(error){
        res.json({success : false , message : error.message})

    }
}

export const toggleLikeCreation = async(req , res)=>{
    try{

        
        const {userId} = req.auth()
        const {id} = req.body

        const [creation] =await sql`SELECT * FROM creations WHERE id = ${id}`

        if(!creation){
            return res.json({success : true , message : "creation not found"})
        }

        const currentLikes = Array.isArray(creation.likes) ? creation.likes : []
        const userIdStr = userId.toString();
        let updatedLikes;
        let message;

        if(currentLikes.includes(userIdStr)){
            updatedLikes = currentLikes.filter(like => like !== userIdStr);
            message = 'creation unliked'
        }else{
            updatedLikes = [...currentLikes , userIdStr]
            message = 'creation liked'
        }

        const formattedArray = `{${updatedLikes.join(',')}}`

        await sql`UPDATE creations SET likes = ${formattedArray}::text[] WHERE id=${id}`


       
        
        res.json({success : true , message})
    }catch(error){
        res.json({success : false , message : error.message})

    }
}