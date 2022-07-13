import dbConnect from "./mongo.js";
const find = async ()=>{
    let data = await dbConnect();
    data = await data.insertOne({name:"Paviter Singh"},{upsert:true});
    console.log(data);
    return data;
}
find();
find();
export default find;