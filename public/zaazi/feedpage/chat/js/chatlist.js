var uid;
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

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    uid = urlParams.get('uid');
    console.log(uid);

    var i=0;
    var j=-1;
   

    let app = firebase.app();
    var db = firebase.firestore(app);

    db.collection('user').doc(uid).collection('chat').orderBy('time','desc').get().then(snapshot => {
        snapshot.forEach(snap => {

            console.log(snap);
            document.getElementById(i).innerHTML=`<table>
            <tr>
            <td><img height="20%" width="20%" src="${snap.data().photourl}" ></td>
            <th onclick="chat('${uid}','${snap.id}')" id="${j}">${snap.data().name}</th>
            
            </tr>
            </table>
            <div id="${i=i+1}"></div>`;
            j=j-1;

        })
    })

});

function chat(me,you){
    window.location.assign(`chat.html?uid=${me}&viewid=${you}`);
}

function frnds(){
  window.location.assign(`../friends.html?uid=${uid}`);
}