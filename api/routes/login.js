
import {generateAccessToken,generateRefreshToken} from "./accessTokens.js";
import dbConnect from "../mongo/mongo.js";
import bcrypt from 'bcrypt';
// accessTokens

const login = async (req,res)=>{
    let user = req.body;
    let db = await dbConnect();
    let data = [];
    if(user.email==null){
     data = await db.find({number:user.number}).toArray();
    }
    else{
        data = await db.find({email:user.email}).toArray();
    }
    if(data.length === 0 || data==null){
        console.log("not a user please sign up");
        return res.status(401).send({error:"no user found"});
        
    }
    if(data.length >1){
        return res.status(500).send({error:"got duplicate values"})
    }
    // console.log(data);
    console.log('found user in db');
    if (await bcrypt.compare(req.body.password, data[0].password)) {
        console.log('password matched')
        const accessToken = generateAccessToken ({user: data[0].name})
        const refreshToken = generateRefreshToken ({user: data[0].name})
        return res.json ({accessToken: accessToken, refreshToken: refreshToken})
        } 
        else {
        return res.status(401).send("Password Incorrect!")
        }
    
    // return data;
}


export default login;