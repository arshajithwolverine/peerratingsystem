





document.addEventListener('DOMContentLoaded', function() {
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      console.log(app);
    } catch (e) {
      console.error(e);
    }
  });

  

   gauth = async() =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user.uid);
        console.log(user.displayName);

     
        let app = firebase.app();

        var db = firebase.firestore(app);

      db.collection('user').doc(user.uid).get().then( (snapshot) => {
            console.log(snapshot.data());
            // console.log(snapshot.data().detailflag)
            if(snapshot.data() === undefined){
              window.location.assign(`/zaazi/profinfo.html?uid=${user.uid}`,"_self");
            }
           else if(snapshot.data().detailflag === false){
              window.location.assign(`/zaazi/profinfo.html?uid=${user.uid}`,"_self");
            }
            else{
              window.location.assign(`/zaazi/feedpage/feedpage.html?uid=${user.uid}`,"_self");
            }
            }).catch(function(error) {
              // Handle Errors here.
             console.log(error)
              // ...
            });
      


        
       
           // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });

      
     
  
}

//   const functions = require('firebase-functions');
//   admin = require('firebase-admin')
//   // const firebase = require("firebase");
//   // Required for side-effects
//   // require("firebase/firestore");
  
  
  
    

// const uname = document.querySelector('#name');
// const uemail = document.querySelector('#email');
// const uphone = document.querySelector('#phone');

// function renderuser(doc){
//   let name=document.createElement('li');

//   name.setAttribute('uid',doc.id);
//   name.textContent=doc.data().name;

//   uname.appendChild(name);

// }

// db.collection('user').get().then( (snapshot) => {
//   snapshot.docs.forEach(doc => {
//     console.log(doc.data())
//     renderuser(doc);
    
//   });
// })