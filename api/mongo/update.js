import dbConnect from "./mongo.js";
const update = async ()=>{
    let data = await dbConnect();
    let result = await data.updateOne({price:"12000"},{
        $set : {name:"old"}
    })
    console.log(result)
}
update();
export default update;