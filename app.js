// declearing a variables
const bodyParser = require("body-parser");
const express = require("express");
const ejs = require("ejs");
const _ = require("lodash");
const app = express();
const port = process.env.PORT || 3000;
const posts = [];
const message = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose injected humour and the like.";

//middle ware    
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static("public"));
app.use((req,res, next)=>{
    setTimeout(next, 3000);
});
// Get route path 

app.get("/",(req,res)=>{
    res.render("main",{
    content : message,
    posts : posts
    });
});

app.get("/about", (req, res)=>{
    res.render("about",{aboutPage : message});
});

app.get("/contact", (req, res)=>{
    res.render("contact",{addContent : message});
});

app.get("/compose",(req, res)=>{
    res.render("compose")
});


// POST Router

app.post("/compose", (req,res)=>{
    const title = req.body.input1;
    const compose = req.body.input2;
    
    const message = {
        title : title,
        composed : compose
    }
    posts.push(message);
    res.redirect("/");
})









// Listening to path

app.listen(port, (req, res)=>{
    console.log(`http://127.0.0.1:${port}`)
})