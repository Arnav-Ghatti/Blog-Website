import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true});

var blogs = [];

app.use(urlencodedParser);

app.get("/", (req, res) => {
    res.render("index.ejs");
})

app.get("/new", (req, res) => {
    res.render("new.ejs");
})

app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {blogs: blogs});
})

app.post("/blogs", (req, res) => {
    blogs.push(req.body);
    console.log(blogs);
    res.redirect("/blogs");
})

app.get("/blog/:id", (req, res) => {
    
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})