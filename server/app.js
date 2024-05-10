
// const multer=require("multer");
// const UserModel = require('./models/users');
// const ConsumerModel = require('./models/ConsumerModel')
// const TransactionModel = require('./models/TransactionModel');
// const passport = require('passport');
const oauth2Strategy=require("passport-google-oauth2").Strategy;
// //const session = require('express-session');
// const VidModel = require('./models/VidModel');
// // const clientId=("978914627210-ik9a9kr6v8t2h5tc0v7tqp0tidbc9aft.apps.googleusercontent.com");
// // const client_secret=("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");
// const client = require('./clients')
// const db = require('./db');
// const OAuth2Data=require("./client_secret.json")
// const {google}=require("googleapis")
// var title,description;
// var tags=[];
// const auth=require("./auth")
// const fs=require("fs");
// //const generateAuthUrl = require('./auth.js').generateAuthUrl;






  
const express = require('express');
const app = express();
const ejs = require('ejs');
const cookieParser = require('cookie-parser')
//google auth
const dotenv = require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const yt = require('./yt')
const path = require('path');
//require('./conf/passport')(passport); //path change krna bbkii h
var MongoClient = require('mongodb').MongoClient;  

//yoUTUBE API
const auth = require('./auth');
const OAuth2Data = require('./client_secret.json');

const { google } = require('googleapis');
var title, description;
var tags = [];
const multer = require('multer');
const fs = require('fs');

const port = process.env.PORT || 3000;
const mongoose = require('mongoose');
const UserModel = require('./models/users');

const { default: jwtDecode } = require('jwt-decode');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');


// //otp var
// const otp=require("./models/otpModel")
// app.post("/send-mail-verification",sendMailVerification)
// const nodemailer=require("nodemailer");
const client = require('./clients')
const db = require('./db');
const TransactionModel = require('./models/TransactionModel');
const VidModel = require('./models/VidModel');
const ConsumerModel = require('./models/ConsumerModel')


//const { default: OpenAI } = require('openai');
const { apikeys } = require('googleapis/build/src/apis/apikeys');
const { content } = require('googleapis/build/src/apis/content');
//openai integration
//const dotenv = require('dotenv').config();
const OpenAI=require("openai")

//otp
// const otpModel=require("./otpModel")
// const nodemailer=require("nodemailer")
// const passwordReset=require("./PasswordReset")
// const bcrypt=require("bcrypt")







// //mongoDb connection with MongoDb atlas
const MONGO_URL = "mongodb://127.0.0.1:27017/youtube"
mongoose.connect(MONGO_URL).then(() => {

}).then(console.log(`Connection successful.`));

// const {v4:uuidv4}=require("uuid"); //bhut sare ids k liye
//  uuidv4();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const static_path = path.join(__dirname, '../client');
const client_path = path.join(__dirname, '../client/templates/views');
app.use(express.static(client_path));
app.use(express.static(path.join(__dirname, "./videos")))
app.set("views", client_path);
app.set("view engine", "ejs");
app.use(cookieParser())
const user=require("./models/users.js");
const { data } = require('../init/users.js');

//const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
// const genAI = new GoogleGenerativeAI("AIzaSyCqvkOaKaZHvRNI6ZpglRXF4jQenwlCCXk");

// async function run() {
//   const generationConfig = {
//     stopSequences: ["red"],
//     maxOutputTokens:30,
//     temperature: 0.9,
//     topP: 0.1,
//     topK: 16,
//   };
  
 
  // For text-only input, use the gemini-pro model
//   const model = genAI.getGenerativeModel({ model: "gemini-pro",generationConfig});

//   const prompt = "generate me titles on funny content"

//   const result = await model.generateContent(prompt);
//   const response = await result.response;
//  const text=response.text();
//   console.log(text);
// }

// run();
const bodyParser=require("body-parser");
const nodemailer=require("nodemailer");
const otpGenerator=require("otp-generator");

const transporter = nodemailer.createTransport({
  service: 'hackpro1029@gmail.com', // Update with your email service provider
  auth: {
    user: 'email@gmail.com', // Update with your email address
    pass: 'plmoknijb' // Update with your email password or app password if using Gmail
  }
});
app.post('/sendOTP', (req, res) => {
  const { email } = req.body;
  const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });
  const mailOptions = {
    from: 'hackpro1029@gmail.com', // Update with your email address
    to:"sdfv",
    subject: 'OTP Verification',
    text: `Your OTP for verification is: ${otp}.Please enter to validate transcation from your account`
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error occurred:', error);
      res.status(500).send('Error sending OTP');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('OTP sent successfully');
    }
  })
})






// const openai=new OpenAI({
//   apiKey:process.env.OPEN_AI_KEY
// });
// const openFun=async()=>{
//   const chatCompletion=await openai.chat.completions.create({
//     model:"gpt-3.5-turbo",
//     messages:[{"role":"user","content":"hastags for funny content",}],
//     max_tokens:30

//  } );
//   console.log(chatCompletion.choices[0].message);
// }
// openFun();




app.get("/becomeclient",(req,res)=>{
  res.render("becomeclient");
})
// app.post("/home/:id",(req,res)=>{
//   res.redirect("index")
// })

















app.get("/home", (_, res) => {
  if (console.error()) {
    res.end("Error loading page.")
  }
  else { res.render('index', { user: null }); }

});

app.get("/home/:uid", async (req, res) => {
  if (req.params.uid) {
    const uid = req.params.uid
    ConsumerModel.find({ uid }).exec()
      .then((docs) => {
        console.log(docs)
        if (docs.length == 0) {
          res.status(404).send("404 User Not Found !")
        }

        res.render('index', { user: docs[0] })
      }).catch(err => {
        res.status(400).send("Server error")
      })
  }
})

//create new user
app.post("/register", async (req, res) => {
  try {
    const newUser = new UserModel({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });
    const registered = await newUser.save();
    res.status(201).render('index');

  } catch (error) {
    res.status(400).send(error);
  }

});

app.post("/auth/callback", (req, res) => {
  let data = jwtDecode(req.body.credential);
  console.log(data);
  console.log(req.body);
  res.redirect('/home');
});
app.get("/google/callback",(req,res)=>{
res.send("hello")
})


//Sign in 
app.get("/signin", (_, res) => {
  const url = auth.getAuthUrl(auth.getGlobalClient())
  res.redirect(url)
});

app.get("/", async (req, res) => {
  auth.handleAuthCode(auth.getGlobalClient(), req.query.code, (client, token) => {
    var userinfo = jwtDecode(token.id_token);
    console.log(userinfo);
    const tokenid = token;
    console.log(client);
    console.log("User logged in with token", token);

    auth.fetchUserInfo(auth.getGlobalClient(), (data) => {
    

      console.log(data.id)

      ConsumerModel.find({ uid: data.id }).exec()
        .then((docs) => docs.length != 0)
        .then(exists => {
          if (exists) {
            res.redirect(`/home/${data.id}`)
            return
          }

          const model = new ConsumerModel({
            uid: data.id,
            name: data.name,
            email: data.email,
            picture: data.picture,
            token: token.access_token,
            user_type: 'consumer',
          });

          model.save()
            .then(() => res.redirect(`/home/${data.id}`))
            .catch(err =>
              res.status(400).send('Failed to create user !: ' + err.toString())
            );
        })
        .catch(err => {
          res.status(400).send("Server error")
        })



    })
  })
});


//multer library store videos
var Storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./videos");
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
  },
});

var upload = multer({
  storage: Storage
})

app.get('/upload/:id', (req, res) => {
  const uid = req.params.id
  db.fetchUserData(uid)
    .then(user => res.render('UPLOAD/upload', { user }))
    .catch(err => {
      res.status(500).send(err.toString())
    })
})

app.post('/upload/:id', upload.single('video'), (req, res) => {
  console.log(req.file)
  title = req.body.title;
  description = req.body.description;
  tags = req.body.tags

  const uid = req.params.id

  db.fetchUserData(uid)
    .then(user => {
      //checking user existance
      if (!user) {
        throw { code: 'UserNotFound' }
      }
      return user;
    })
    .then(user => {
      // Check if user is logged in
      if (!user.token)
        throw { code: 'UserNotLoggedIn' }
      return token
    })
    .then(token => {
      // Create a new client with the given token
      return client.fetchClient(req.params.id, token)
    })
    .then(client => {
      const youtube = google.youtube({
        version: 'v3',
        auth: client
      })

      youtube.videos.insert(
        {
          resource: {
            snippet: {
              title: title,
              description: description,
              tags: tags
            },
            status: {
              privacyStatus: "private"
            },
          },

          part: "snippet,status",

          media: {
            body: fs.createReadStream(req.file.path)
          }
        },
        (err, data) => {
          if (err) throw { code: 'YoutubeError', err }
          console.log("uploading done");
          res.redirect(`/upload/${uid}`)
        }
      )
    })
    .catch(err => {
      if (err.code == 'UserNotFound') {
        res.redirect(`404/usernotfound/${uid}`)
      } else if (err.code == 'UserNotLoggedIn') {
        res.status(400).send('User not logged in')
      } else {
        res.status(500).send('Internal error\n' + err.err.toString())
      }
    })

})
// const sendOTPverficationEmail=async({_id,email})=>{
// try{
//   const otp=`${Math.floor(1000+Math.random()*9000)}`;
// }catch(error){

//   const mailOptions={
//     from:,
//     to:email,
//     subject:"verify User before uploadation",
//     html:`<p> Enter <b>${otp}</b> in the application to verfiy the service provider of your youtube video for uploadation.
//     this expires in 2 mins`
  
//   };
//   const saltRounds=10;
// }
// };


app.delete("/profile/:id",async(req,res)=>{
  t.merchant_vid = vid._id
  let deleteListing=await user.findByIdAndDelete(vid_id);
  console.log(deleteListing)
  res.render("profile/profile")
  //res.redirect(/profile/:id/txn/create)
})






app.get('/profile/:id/txn/create', (req, res) => {
  const uid = req.params.id
  db.fetchUserData(uid)
    .then(user => {
      res.render('create/index', {user})
    })
    .catch(err => res.redirect('404/usernotfound/' + uid))
})

app.post('/profile/:id/txn/create', upload.single('video'), (req, res) => {
  const {path} = req.file
  db.fetchUserData(req.params.id)
  .then(user => {
    const model = new VidModel({
      path
    })
    model.save()
      .then((doc) => {
        new TransactionModel({
          name: req.body.name,
          description: req.body.description,
          consumer: user._id,
          consumer_vid: doc._id,
        })
        .save()
        .then(doc => {
          console.log(doc, user)
          user.transactions
            .push(doc._id)
          
          user.save()
            .then(() => {
              res.redirect(`/profile/${req.params.id}`)
            })
            .catch(err => res.status(500).send('1. failed ' + err.toString()))
        })
        .catch(err => res.status(500).send('2. failed ' + err.toString()))
      })
      .catch(err => res.status(500).send("3. failed " + err.toString()))
  })
})

app.get('404/usernotfound/:id', (req, res) => {
  res.send(
    "No user with the id " + req.params.id + " is present"
  )
})

app.get('/profile/:id', (req, res) => {
  const uid = req.params.id
  // checking user's presence
  db.fetchPopulatedUserData(uid)
    .then(user => {
      res.render('profile/profile', {user, transactions: user.transactions})
    })
    .catch(err => res.redirect(`404/usernotfound/${uid}`));
})

//app.get("/profile/:id",async(req,res)=>{
  // let db2=new ConsumerModel({
  //     name:"riya chandra",
  //     uid: data.id,
  //     email:"12@gmail.com",
  //    // token:"",
  //    // picture:"https://static.toiimg.com/photo/msid-53891743,width-96,height-65.cms",
  //     user_type:"editor",
  //     //transactions:""
  // });
  
// app.post("/profile/:id",async(req,res)=>{

//   let db2= new ConsumerModel({
//     name:"satyarupa",
//     uid: data.id,
//     email:"satyarupasingh77@gmail.com",
//    token:"",
//    picture:"https://learnopencv.com/wp-content/uploads/2016/05/average-woman-face.jpg",
//     user_type:"editor",
//     transactions:""
//   });
  
//   await db2.save();
//   console.log("sample was saved");
//   res.send("successful");
//   })app.get("/search", async (req, res) => {
  app.get("/profile/:id", (req, res) => {
    let db2 = new ConsumerModel({
      name: "satyarupa",
      uid: "data.id", 
      email: "satyarupasingh77@gmail.com",
       token: "",
      picture: "https://learnopencv.com/wp-content/uploads/2016/05/average-woman-face.jpg",
      user_type: "editor",
      transactions: [],
    });
  
    db2.save()
      .then(savedData => {
        console.log("Consumer data was saved:", savedData);
        res.send("Successful");
      })
      .catch(error => {
        console.error("Error saving consumer data:", error);
        res.status(500).send("Error saving consumer data");
      });
  });
  

  

  
  
   


app.get('/search', (req, res) => {
  const searchText = req.query.query || ''
  ConsumerModel.find()
    .exec()
    .then(docs => {
      const filtered = docs
      .filter(d => {
        return d.name.startsWith(searchText)
      })
      res.render('search/search', { entries: filtered, searchText })
    })
    .catch(err => res.status(500).send('Internal Server Error'))
})
app.get("/search",(req,res)=>{
  ConsumerModel.find()
  .exec()
  .then(docs => {
    const filtered = docs
    .filter(d => {
      return d.name.startsWith(searchText)
    })
    res.render('search/search', { entries: filtered, searchText })
  })
  .catch(err => res.status(500).send('Internal Server Error'))
})


app.get("/editor",(req,res)=>{
 res.render("editor/editor",{user})
})


app.post("/profile/:id",async(req,res)=>{

try{
  const db2=new ConsumerModel({
    name:"sristy",
    uid: data.id,
    email:"shristy@gmail.com",
   token:"",
   picture:"https://learnopencv.com/wp-content/uploads/2016/05/average-woman-face.jpg",
    user_type:"editor",
    transactions:"zxc.mp4"
  });


await db2.save();
console.log("sample was saved");
res.send("successful");
}catch(error){
  console.error("error saving ",error);
  res.status(500).send("error in asving")
}

})






  app.get("/searchpge",(req,res)=>{
    res.render("search_page/search")
  })




app.get('/user/:id/listings', (req, res) => {
  const uid = req.params.id
  db.fetchPopulatedUserData(uid)
    .then(user => {
      const {transactions} = user
      res.render('listings/index', {transactions})
    }).catch(err => res.redirect('404/usernotfound/' + uid))
})

app.get('/apply/:tid', (req, res) => {
  const tid = req.params.tid
  res.render('UPLOAD/upload', {tid})
})

app.post('/apply/:tid', upload.single('video'), (req, res) => {
  const session = JSON.parse(req.cookies.session_data)
  console.log(session.uid)
  const uid = session.uid
  const tid = req.params.tid
  db.fetchUserData(uid)
    .then(user => {
      new VidModel({
        path: req.file.path
      }).save()
      .then(vid => {
        TransactionModel.findOne({_id: tid})
        .populate('consumer')
        .exec()
        .then((t) => {
          t.merchant = user._id
          t.merchant_vid = vid._id
          t.save()
            .then(() => {
              //Upload the file here.
              console.log(auth.getCredentials())
              console.log(t.consumer.token)
              yt.uploadVideo(client.fetchClient(t.consumer.uid, t.consumer.token), {
                title: req.body.title,
                description: req.body.description,
                tags: req.body.tags,
                path: vid.path
              })
                .then(() => res.redirect('/home'))
                .catch(err => res.status(500).send(JSON.stringify(err)))
            })
            .catch(err => res.status(500).send(err.toString()))
        })
      }).catch(err => res.status(500).send(err.toString()))
    }).catch(err => res.status(500).send(err.toString()))//res.redirect('/404/usernotfound/' + uid))
})

app.get("/show",(req,res)=>{
  res.render("show/show")
})




app.get('/video/download/:id', (req, res) => {
  req.params.id

  VidModel.findOne({_id: req.params.id})
  .exec()
  .then(v => {
    const {path} = v
    res.sendFile(path, {root: '.'})
  })
  .catch(err => res.status(404).send('404 User not found'))
})


app.listen(port, () => {
  if (console.error()) { console.log("Error in server.") }
  else { console.log(`server runs perfectly on port ${port}`); }

});

module.exports = function (app) {
  console.log(app);
};

