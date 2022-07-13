import dbConnect from "./mongo.js";
const delet = async ()=>{
    let data = await dbConnect();
     let result = await data.deleteOne({name:"old"})
     console.log(result)
    return data;
}
delet();
export default delet;