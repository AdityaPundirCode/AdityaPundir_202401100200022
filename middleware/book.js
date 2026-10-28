const mongoose=require('mongoose');

const BooksSchema=new mongoose.schema({
    title:{
        type:String
    }
    ,
    author:{
        type:String
    }
    ,category:{
        type:String

    },
    availablity:{
        type:String
    }
     
})
const BooksModel=mongoose.models("Books",BooksSchema);

exports.module=BooksModel
