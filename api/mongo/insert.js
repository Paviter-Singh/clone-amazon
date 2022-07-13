import dbConnect from "./mongo.js";
const insert = async () =>{
    let db = await dbConnect();
    const result = await db.insertOne({name: 'redmi note 5 pro',
    brand: 'redmi',
    price: '12000'}, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
       
      })

}
insert()
export default insert;