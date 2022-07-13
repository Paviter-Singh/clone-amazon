import dbConnect from "../mongo.js";


const login = async (username = null,number)=>{
    let db = await dbConnect();
    let data = [];
    if(username==null){
     data = await db.find({number:number}).toArray();
    }
    else{
        data = await db.find({username:username}).toArray();
    }
    if(data.length === 0 || data==null){
        console.log("not a user please sign up");
        return ;
    }
    
    return data;
}

export default login;