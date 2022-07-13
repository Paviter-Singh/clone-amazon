
import  express  from 'express';
import dbConnect from '../mongo/mongo.js';
import bcrypt from "bcrypt"
import login from './login.js';
import { generateAccessToken,generateRefreshToken,refreshTokens,refreshTokensSet} from './accessTokens.js'
const router = express.Router()
// import User from "../"
// const User = require('../`models/user')
async function new_user(req,res){
    const username = req.body.name;
const hashedPassword = await bcrypt.hash(req.body.password, 10);
let db = await dbConnect();
let data = await db.insertOne({username: username,number:req.body.number, email: req.body.email,password: hashedPassword})

res.status(201).send(data)
console.log(data)
}
async function isuniqueEmail(email){
    let data = await dbConnect();
    data = await data.find({email}).toArray();
    // console.log(data);
    if(data.length === 0)return false;
    return true;
}
async function isuniqueNumber(number){
    let data = await dbConnect();
    data = await data.find({number}).toArray();
    // console.log(data);
    if(data.length === 0)return false;
    return true;
}
router.post('/login', async (req, res) => {
   login(req,res);

});

router.post('/signup', async (req, res) => {
    
 if(await isuniqueEmail(req.body.email)){
        return res.status(500).send({error:"email is already taken"});
    }
    if(await isuniqueNumber(req.body.number)){
        return res.status(500).send({error:"Number already taken"});
        
    }
    new_user(req,res);

});

router.post("/refreshToken", (req,res) => {
    if (!refreshTokens.includes(req.body.token)) return res.status(400).send("Refresh Token Invalid")
    
    refreshTokens.map((c)=>{console.log(c)})
    refreshTokensSet(refreshTokens.filter( (c) => c != req.body.token))
   
    //remove the old refreshToken from the refreshTokens list
    const accessToken = generateAccessToken ({user: req.body.name})
    const refreshToken = generateRefreshToken ({user: req.body.name})
    //generate new accessToken and refreshTokens
    res.json ({accessToken: accessToken, refreshToken: refreshToken})
    })
router.delete("/logout", (req,res)=>{
         refreshTokensSet(refreshTokens.filter( (c) => c != req.body.token));
        //remove the old refreshToken from the refreshTokens list
        res.status(204).send("Logged out!")
        })
export default router