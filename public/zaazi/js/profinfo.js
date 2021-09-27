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

    // const queryString = window.location.search;
    // const urlParams = new URLSearchParams(queryString);
    // const uid = urlParams.get('uid')
    // console.log(uid)

    // let app = firebase.app();
    // var db = firebase.firestore(app);

    // db.collection('user').doc(uid).get().then((snapshot) => {
    //   // console.log(snapshot.data());
    //   document.getElementById('name').value = snapshot.data().name;
    //   document.getElementById('email').value = snapshot.data().email;
    //   document.getElementById('phone').value = snapshot.data().phone;
    // })


    
    


    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('uddd : '+ user.uid)
        document.getElementById('name').value = user.displayName;
        document.getElementById('email').value = user.email;
        document.getElementById('phone').value = user.phoneNumber;
        
      } else {
        console.log('Oops')
      }
    });

  });

  setfunc = async() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid')
    console.log(uid)

    let app = firebase.app();
    var db = firebase.firestore(app);
    console.log('Oopppps')
   await db.collection('user').doc(uid).update({
    // console.log(snapshot.data());
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    gender: document.getElementById('gender').value,
    detailflag: true
  })
    window.location.assign(`/zaazi/feedpage/feedpage.html?uid=${uid}`,"_self");
  }