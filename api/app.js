
import express from 'express';
import dotenv from 'dotenv';
import auth from "./routes/auth.js"
import validateToken from './routes/validate.js'
// Port Number
dotenv.config();
const app = express();
const PORT = process.env.PORT ||5000;

app.use(express.json())
app.use('/auth',auth);
app.get("/posts", validateToken, (req, res)=>{
  console.log("Token is valid")
  console.log(req.user.user)
  res.send(`${req.user.user} successfully accessed post`)
  })
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));
//   console.log(awafind())