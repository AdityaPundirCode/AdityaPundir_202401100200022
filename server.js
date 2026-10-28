require('dotenv').config()
const express=require('express')
const BookRoute=require('./routes/BookRoute');
const mongoose=require('mongoose')


const app=express()




app.use(express.json())


const PORT=process.env.PORT||3000
const MONGODB_URL=process.env.MONGODB_URL

mongoose.connect(MONGODB_URL).then(()=>{
    console.log("database connected");
}).catch((error)=>{
    console.log("dataBase not connected "+error);
})
app.use('/api',BookRoute)




app.listen(PORT,()=>{
    console.log("server is listening ")
})
console.log(new Date().toLocaleTimeString());