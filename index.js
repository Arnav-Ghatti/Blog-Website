import express from "express";
import bodyParser from "body-parser";

const port = 3000;
const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: true});

var blogs = [];

app.use(urlencodedParser);
app.use(express.static("public"));

// HOME PAGE
// Display Home page
app.get("/", (req, res) => {
    res.render("index.ejs");
})

// NEW POST OR UPDATE POST PAGE
// Display page to make a new psot
app.get("/new", (req, res) => {
    res.render("new.ejs");
})

// Post to /new to add new post
app.post("/new", (req, res) => {
    blogs.push(req.body);
    res.redirect("/blogs");
})

// ALL BLOGS PAGE
// Display all blogs
app.get("/blogs", (req, res) => {
    res.render("blogs.ejs", {blogs: blogs});
})

// INDIVIDUAL BLOGS PAGE
// Display selected blog
app.get("/blog/:id", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    res.render("blog.ejs", {blog: selectedBlog, id: selectedId})
})

// Delete post
app.post("/blog/:id", (req, res) => {
    var selectedId = req.params.id;
    blogs.splice(selectedId, 1);
    res.redirect("/blogs");
    alert("Deleted Post");
})

// Display Edit page for seleced blog
app.get("/blog/:id/edit", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    res.render("new.ejs", {blog: selectedBlog, id: selectedId})
})

// Post to /blogs/:id/edit for editing post
app.post("/blogs/:id/edit", (req, res) => {
    var selectedId = req.params.id;
    var selectedBlog = blogs[selectedId];

    blogs[selectedId] = req.body;

    res.redirect(`/blog/${selectedId}`);
})

app.listen(port, () => {
    console.log(`server running on ${port}`)
})