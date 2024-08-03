const express = require('express')
const app = express()
const port =5000
//start
const cors=require('cors') 
const stripe=require("stripe")("sk_test_51P7b5USFN6I3Hid9yWDOYTBqvb7aqLcal8VknOQyRiwjVII7wa7JCZYuZsdmj7eocmLx5huAWxvCcCXTGsz2xHRa00n4r6C4QM")
// end
const mongoDB =require("./db") 
mongoDB();
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin":"*","https://gofood-front.vercel.app/");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.use(express.json ())
// start
//app.use(cors());
app.use(cors({
  origin:"*",
  credentials:true,
}));
app.post("/api/create-checkout-session",async(req,res)=>{
  const {products}=req.body;
  console.log('index.js PRODUCTS->',products);

  const lineItems =products.map((product)=>({
       price_data:{ 
        currency:'inr',
        product_data:{
          name :product.name
        },
        unit_amount:product.price * 100,  
       },
       quantity:product.qty 
  }));
  const session=await stripe.checkout.sessions.create({
    payment_method_types:["card"], 
    line_items:lineItems,
    mode:"payment",
    //success_url:"http://localhost:3500/myorder",
    //cancel_url:"http://localhost:3500/cancel",
    success_url:"https://gofood-front.vercel.app/myorder",
    cancel_url:"https://gofood-front.vercel.app/cancel",
  })
  res.json({id:session.id})
})
// end
app.use('/api', require("./Routes/CreatUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));

app.get('/', (req, res ) => {
  res.send('Hello World -->')
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
