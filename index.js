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

app.post("/new", (req, res) => {
    blogs.push(req.body);
    res.redirect("/blogs");
})

app.get("/blog/:id", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    res.render("blog.ejs", {blog: selectedBlog, id: selectedId})
})

app.get("/blog/:id/edit", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    res.render("new.ejs", {blog: selectedBlog, id: selectedId})
})

app.post("/blogs/:id/edit", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    blogs[selectedId] = req.body;

    res.redirect(`/blogs/${selectedId}`);
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})