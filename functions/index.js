const functions = require('firebase-functions');
admin = require('firebase-admin')
// const firebase = require("firebase");
// Required for side-effects
// require("firebase/firestore");


app = admin.initializeApp({

    projectId: "peer-rating-system"
  });
  
  var db = admin.firestore(app);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.sendWelcomeEmail = functions.auth.user().onCreate((user) => {
    console.log(user);
    console.log("uid   "+user.uid);
    console.log(user.displayName);
    
    db.collection("user").doc(user.uid).set({
        name: user.displayName,
        email: user.email,
        phone: user.phoneNumber,
        photourl: user.photoURL,
        detailflag: false,
        gender: "",
        about: "",
        time : admin.firestore.Timestamp.fromDate(new Date())
    })
    .then(function() {
        return console.log("Document successfully written!");

    })
    .catch(function(error) {
        return console.error("Error writing document: ", error);
    });
  });



//   exports.getStreams = functions.https.onRequest((req, res) => {

//     // req.method
//     // req.body.userid
//       admin.firestore().collection('streams').get().then(data => {
//         let streams = [];  
//         data.forEach(doc => {
//               streams.push(doc.data());

//           });
//           return res.json(streams);
//       })
//       .catch(err => console.error(err))
//   });
  
//   exports.createStream = functions.https.onRequest((req, res) => {
//     if(req.method !== 'POST'){
//         return res.status(400).json({ error : 'Method not allowed !!'});
//     }
//     const newStream = {
//         body: req.body.body,
//         userHandle: req.body.userHandle,
//         createdAt: admin.firestore.Timestamp.fromDate(new Date()).toDate()
//     };
    
//     admin.firestore().collection('streams')
//         .add(newStream)
//         .then(doc =>{
//           return res.json({ message: `document ${doc.id} created successfully`});
//         })
//         .catch(err => {
//             res.status(500).json({ error: 'errorrr!!!'});
//             console.error(err);
//         });
// });

