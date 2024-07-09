// declearing a variables
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const port = process.env.PORT || 3000;
const posts = [];
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const message = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.";

//middle ware    
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');





// Get route path 

app.get("/",(req,res)=>{
    res.render("main",{
    content : message,
    posts : posts
    });
});

app.get("/about", (req, res)=>{
    res.render("about",{
    aboutPage : message
    });
});

app.get("/contact", (req, res)=>{
    res.render("contact",{
    addContent : message
    });
});

app.get("/compose",(req, res)=>{
    res.render("compose");
});

app.get("/post/:Id", (req, res)=>{
    const Id = req.params.Id;
    
    let postId = posts.find(post => post.Id == Id);
    
    res.render("post",{
        post : postId
    });
   
});



// POST Router

app.post("/compose",upload.single('input3'), (req,res)=>{
    
    let lastId = 0;
    const title = req.body.input1;
    const authur = req.body.input2;
    const image = req.file;
    const composed = req.body.input4;
    
// creating object for user form  
    const message = {
        Id : lastId += 1,
        title : title,
        authur : authur,
        image : image,
        composed : composed
    };
    
    posts.push(message);
    res.redirect("/");
});








// Listening to path

app.listen(port, (req, res)=>{
    console.log(`http://127.0.0.1:${port}`);
});