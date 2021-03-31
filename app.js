const express = require("express");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const serviceAccount = require("./service-account.json");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
})

// app.get("/terms-conditions", function(req, res){
//   res.sendFile(__dirname + "/terms-conditions.html");
// })
//
// app.get("/privacy-policy", function(req, res){
//   res.sendFile(__dirname + "/privacy-policy.html");
// })

const callMeData = {
  name: "",
  mobNumber: "",
  email: "",
  interested_in: "",
  category: "",
}

const getInContactData = {
  name: "",
  mobNumber: "",
  email: "",
  message: "",
}

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();


app.post('/callMe', function(req, res){
  // console.log(req.body.lname);
  // console.log(req.body.lphone);
  // console.log(req.body.lemail);
  // console.log(req.body.lselect);
  // console.log(req.body.second);
  // console.log(req.body.lterms);
  callMeData.name = req.body.lname;
  callMeData.mobNumber = req.body.lphone;
  callMeData.email = req.body.lemail;
  callMeData.interested_in = req.body.lselect;
  callMeData.category = req.body.second;

  db.collection('Call Me').doc(callMeData.name).set(callMeData).then(() =>{
    console.log('new qurey added to Call Me db');
  });

})

app.post('/getInContact', function(req, res){
  getInContactData.name = req.body.cname;
  getInContactData.mobNumber = req.body.cphone;
  getInContactData.email = req.body.cemail;
  getInContactData.message = req.body.cmessage;
  db.collection('Get In Contact').doc(getInContactData.name).set(getInContactData).then(() =>{
    console.log('new qurey added to Get In Contact db');
  });
})

app.listen(3000 || process.env.PORT, function(){
  console.log("server started on port 3000");
});
