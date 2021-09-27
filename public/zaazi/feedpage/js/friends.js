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
    const uid = urlParams.get('uid');
    console.log(uid);

    var i=0;
    var j=-1;
    

    let app = firebase.app();
    var db = firebase.firestore(app);

    db.collection('user').doc(uid).collection('friends').orderBy('name','asc').get().then(snapshot => {
        snapshot.forEach(snap => {

            console.log(snap);
            document.getElementById(i).innerHTML=`<table>
            <tr>
            <td><img height="20%" width="20%" src="${snap.data().photourl}" ></td>
            <th onclick="chat('${uid}','${snap.data().userid}')">${snap.data().name}</th>
            <td id="${j}"><input  type="button" value="Unfriend" onclick="unfriend('${uid}','${snap.data().userid}','${j}')"></td>
            </tr>
            </table>
            <div id="${i=i+1}"></div>`;
            j=j-1;
        })
    })

});


function unfriend(uid,viewid,unbuttonid)
{
    let app=firebase.app();
    var db= firebase.firestore(app);

    db.collection('user').doc(uid).collection('friends').get().then(snapshot => {
        snapshot.forEach(snap => {
            if(snap.data().userid === viewid)
            {
                db.collection('user').doc(uid).collection('friends').doc(snap.id).delete().then(function(){
                })
            }
        })
    
}).then(function(){
    db.collection('user').doc(viewid).collection('friends').get().then(snapshot => {
        snapshot.forEach(snap => {
            if(snap.data().userid === uid)
            {
                db.collection('user').doc(viewid).collection('friends').doc(snap.id).delete().then(function(){
                    document.getElementById(unbuttonid).innerHTML="Done";
                })
            }
        })
    
})
})
}

function chat(me,you){
    window.location.assign(`chat/chat.html?uid=${me}&viewid=${you}`);
}