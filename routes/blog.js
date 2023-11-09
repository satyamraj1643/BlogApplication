const { Router } = require("express");
const  multer  = require("multer")
const path = require("path");

const {Blog} = require('../models/blog');

const blogrouter = Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
     const filename = `${Date.now()} - ${file.originalname}`
     cb(null, filename);
    }
  })

  const upload = multer({ storage: storage })

blogrouter.get('/addblog', (req,res)=>{

    let topass = null;

    if(req.user!=null){
        topass = req.user;
        
    }
    return res.render("addblog", {
          uservalue : topass,
         
    })


})



blogrouter.post('/', upload.single("coverImage"), async (req, res) => {
  try {
      if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' });
      }
      
      const { title, body } = req.body;
      const blog = await Blog.create({
          title: title,
          body: body,
          coverImageURL: `/uploads/${req.file.filename}`,
          createdBy: req.user._id,
          userName: `${req.user.firstName} ${req.user.lastName}`
      });

      return res.redirect(`/${blog._id}`);
  } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
});
blogrouter.get('/:id',async (req,res)=>{
       const blog = await Blog.findById(req.params.id);
       return res.render('blogview', {
        user : req.user,
        blog: blog,
       })
})



module.exports={
    blogrouter,
}