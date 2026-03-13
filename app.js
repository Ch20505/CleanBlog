const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/Post');
const ejs = require('ejs');
const app = express();

// MongoDB bağlantısı
mongoose.connect('mongodb://localhost/pcat-test-db',{

});
 

// Template Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// ROUTES

app.get('/', async (req,res)=>{
  const posts = await Post.find({});
  res.render('index',{
    posts
    });
});

app.get('/posts/:id', async (req, res) => {
    //console.log(req.params.id);
    //res.render('about');
    const post = await Post.findById(req.params.id) // id'ye göre veritabanından fotoğrafı bul
    res.render('post', {  // post.ejs dosyasına fotoğraf verisini gönder
        post  // post değişkeni, post.ejs dosyasında kullanılabilir
    })
});

app.get('/about',(req,res)=>{
  res.render('about');
});

app.get('/add',(req,res)=>{
  res.render('add');
});

app.post('/posts', async (req,res)=>{
  await Post.create(req.body);
    res.redirect('/');
});

const port = 3000;

app.listen(port, ()=>{
  console.log(`Server ${port} portunda çalışıyor`);
});