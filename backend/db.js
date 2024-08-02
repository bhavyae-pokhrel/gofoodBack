const mongoose=require('mongoose');
const mongoURI="mongodb+srv://gofood:mern123@cluster0.rxgwkhq.mongodb.net/gofoodmern"

const mongoDB =async() =>{
    mongoose.set('strictQuery', true)
    await mongoose.connect(mongoURI,
        {useNewUrlParser:true,useUnifiedTopology:true},
        async(err,result)=>{
        if(err){
            console.log("error-->",err);
        }
        else{
            console.log(' DB Connected');
            const fetched_data=await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function(err,data){
                const foodCategory=await mongoose.connection.db.collection("foodCategory");
                foodCategory.find({}).toArray(function(err,catData){
                   if(err){
                    console.log("ERROR--->",err);
                   }
                   else{
                    global.food_items=data;
                    global.foodCategory=catData;
                   // console.log(global.food_items);
                  // console.log( global.foodCategory);
                   }
                })
            })
        }
    });
}
module.exports=mongoDB;
// module.exports=monogDB(); gives error
