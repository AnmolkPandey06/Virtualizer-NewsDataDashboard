import  express from 'express'
import bodyParser from 'body-parser' 
import  cors from  'cors';
import dotenv from 'dotenv' 
import mongoose from 'mongoose'
import helmet from 'helmet'
// const data =i './jsondata'
import Information  from './modals/information.js'

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());//to tell the server ki take the json data


app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(bodyParser.json({limit:'30mb',extended:true}));


// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin','http://localhost:3000/');
//   res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials',true)
//   next();
// });

// const readingJsonfile=async(data)=>{
//     let index = 0
//     for (index = 0; index < data.length; index++) {
//         const packet=data[index];
//         const pack=new Information(packet);
//         // console.log(pack);
//         await pack.save();
      
//     }
//     console.log(index);

//     console.log(await Information.find());
// }

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });

app.get('/details',async(req,res)=>{
    
   const data= await Information.find();
   res.status(200).send(data); 

})




mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('datbase connected')
    const PORT=process.env.PORT||4000;
    app.listen(PORT,()=>console.log(`Server Port :${PORT}`));
    
  })
  .catch((error)=>console.log(`${error} did not connect`));
