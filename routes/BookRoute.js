const express=require('express');
const router=express.Router();

const Books=require('../middleware/books');

router.post('/books',async(req,res)=>{

    try{
    const {id,title,author,category,  availablity}=req.body;
    if(!id || !title || !author || !category || !  availablity){
        return res.status(400).json({
            message:"Fill the complete details"
        })
    }

    const newBook={
        id:parseInt(id),
        title:title,
        auhtor:author,
        category:category,
        availablity:availablity
    }

    await Books.insertOne({
        id:parseInt(id),
        title:title,
        auhtor:author,
        category:category,
        availablity:availablity
    });
    return res.status(200).json({
        message:"new bok added",
        book:newBook
    })

}catch(error){
    return res.status(400);
}
})



router.get('/books', async (req, res) => {
  try {
    const page=parseInt(req.query.page,10)||1
    const limit=parseInt(req.query.limit,10)||10;
    const santpage=page>1?page:1
    const santLimit=limit<1?10:limit
    const skip=(santpage-1)*santLimit
    
    const [data,totalTask]=await Promise.all([
      Books.find().sort({createdAt:-1}).skip(skip).limit(santLimit),
      Books.countDocuments()
    ])
    totalPages=Math.ceil(totalTask/santLimit)

    return res.status(200).json({
      success:true,
      metadata:{
        totalTask:totalBooks,
        totalPages:totalPages,
        currentPage:page
      },
      data:data

    });



  } catch (error) {
    console.error("Error fetching Books:", error);
    return res.status(500).json({
      message: "Failed to fetch Books",
      error: error.message
    });
  }
});




router.patch('/books/:id',async(req,res)=>{

   try{

  const ids=parseInt(req.params.id);
  if(!ids){
    return res.status(400).json({
        message:"not found"
    })
  }

  const book=await Books.find({id:ids});
  res.status(404).json({
    message:"this books not available with this id"
  })

  if(book.availablity=="No"){
    return res.status(200).json({
        message:"books present but stock not avaiable"
    })

  }
  return res.status(200),json({
    book:book
  })

}catch(error){
    return res.status(400);
}

}
)


module.exports=router