const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/User');
const Post=require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const cookieParser=require('cookie-parser');
const multer=require('multer');
const path = require('path');
const fs=require('fs');

// const uploadMiddleware = multer({ dest: 'uploads/' })
// const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });
const uploadMiddleware = multer({ dest: path.join(__dirname, 'uploads') });


const app = express();


const secret='asdkb8271t87gs817';

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const corsOptions = {
  credentials: true,
  origin: 'http://127.0.0.1:5173'
};

app.use(cookieParser());
app.use(cors(corsOptions));

app.use(express.json());
// app.use('/uploads',express.static(__dirname+'/uploads'))
app.use('/uploads', express.static(__dirname + '/uploads'));


(async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://karthiknadar1204:K2eNxG9Zc4SM5rv8@cluster0.q0xtskp.mongodb.net/?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
})();

app.post('/register', async (req, res) => {
  const { Username, password } = req.body;

  if (!Username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  const existingUser = await User.findOne({ Username });

  if (existingUser) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userDoc = new User({ Username, password: hashedPassword });
    await userDoc.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user' });
  }
});



//Login the user
app.post("/login", async function (req, res){
  const { username, password } = req.body;
  const userDoc = await User.findOne({ username });
  
  if (!userDoc) {
    return res.status(404).json({ message: "User not found" });
  }
  
  const passwordCorrect = await bcrypt.compare(password, userDoc.password);

  if (passwordCorrect) {
    jwt.sign({ username, id: userDoc._id }, secret, {}, (err, token) => {
      if (err) {
        throw err;
      } else {
        // res.json(token); 
        // res.cookie('token',token).json('ok')
        res.cookie('token', token, {
          httpOnly: true,
          secure: true,
          expires: new Date(Date.now() + 86400 * 1000),
          path: '/',
        }).send();
      }
    });
  } else {
    res.status(401).json({ message: "Login failed. Please check your credentials."});
  }
})


app.get('/profile', (req, res) => {
  const { token } = req.cookies;
  console.log('Received token:', token);
  if (!token) {
    return res.status(401).json({ message: "Token not provided" });
  }

  jwt.verify(token, secret, {}, (err, info) => {
    if (err) {
      return res.status(401).json({ message: "Token verification failed" });
    }
    res.json(info);
  });
}); 


app.post('/post', uploadMiddleware.single('file'), async (req, res) => {
  const {originalname,path}=req.file;
  const parts=originalname.split('.');
  const ext=parts[parts.length-1]
  // res.json({files:req.file});
  const newPath=path+'.'+ext;
  fs.renameSync(path,newPath);

  const {title,summary,content}=req.body;
  const postDoc=await Post.create({
    title,
    summary,
    content,
    cover:newPath,

  })
  res.json(postDoc)
  // res.json({ext});
});




app.get('/post',async (req,res)=>{

  const posts=await Post.find().sort({createdAt:-1}).limit(20);

  res.json(posts);
})


app.get('/post/:id', async (req,res)=>{
  const {id}=req.params;
  const postDoc=await Post.findById(id);
  res.json(postDoc);
})

app.put('/post',uploadMiddleware.single('file'), async (req, res)=>{
  // res.json(req.file);
  let newPath=null;
  if(req.file){
    const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1]
    newPath=path+'.'+ext;
    fs.renameSync(path,newPath);
    }
    
  const {id,title,summary,content}=req.body;
  // const postDoc=await Post.findById(id);
  try {
    const postDoc = await Post.findById(id);

    if (!postDoc) {
        return res.status(404).json({ error: 'Post not found' });
    }

    // Continue with the update logic
    // ...
} catch (error) {
    console.error('Error while updating post:', error);
    return res.status(500).json({ error: 'Internal server error' });
}


  await postDoc.update({
    title,
    summary,
    content,
    cover:newPath ? newPath: postDoc.cover
  })

})


app.listen(4001, () => {
  console.log('Server is running on port 4001');
});
