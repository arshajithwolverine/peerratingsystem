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
    var k=-10000;

    let app = firebase.app();
    var db = firebase.firestore(app);

    db.collection('user').doc(uid).collection('friendreq').orderBy('time','desc').get().then(snapshot => {
        snapshot.forEach(snap => {

            console.log(snap);
            document.getElementById(i).innerHTML=`<table>
            <tr>
            <td><img height="20%" width="20%" src="${snap.data().photourl}" ></td>
            <th>${snap.data().name}</th>
            <td id="${j}"><input  type="button" value="Accept" onclick="acceptreq('${uid}','${snap.data().userid}','${j}','${k}')"></td>
            <td id="${k}"><input  type="button" value="Reject" onclick="reject('${uid}','${snap.data().userid}','${k}','${j}')"></td>
            </tr>
            </table>
            <div id="${i=i+1}"></div>`;
            j=j-1;
            k=k-1;
        })
    })

});

function acceptreq(uid,viewid,abuttonid,rbuttonid){
    let app=firebase.app();
    var db= firebase.firestore(app);

    db.collection('user').doc(viewid).get().then(snapshot => {
    db.collection('user').doc(uid).collection('friends').add({
        userid : viewid,
        name : snapshot.data().name,
        time : firebase.firestore.Timestamp.fromDate(new Date()),
        photourl : snapshot.data().photourl
    }).then(function(){
        document.getElementById(abuttonid).innerHTML="Accepted";
        document.getElementById(rbuttonid).innerHTML="";

        db.collection('user').doc(uid).collection('friendreq').get().then(snapshot => {
            snapshot.forEach(snap => {
                if(snap.data().userid === viewid)
                {
                    db.collection('user').doc(uid).collection('friendreq').doc(snap.id).delete().then(function(){
                    })
                }
            })
        
    })

    })
}).then(function(){
    db.collection('user').doc(uid).get().then(snapshot => {
      db.collection('user').doc(viewid).collection('friends').add({
          userid : uid,
          name : snapshot.data().name,
          time : firebase.firestore.Timestamp.fromDate(new Date()),
          photourl : snapshot.data().photourl
      })
    })
  })
}

function reject(uid,viewid,rbuttonid,abuttonid)
{
    let app=firebase.app();
    var db= firebase.firestore(app);

    db.collection('user').doc(uid).collection('friendreq').get().then(snapshot => {
        snapshot.forEach(snap => {
            if(snap.data().userid === viewid)
            {
                db.collection('user').doc(uid).collection('friendreq').doc(snap.id).delete().then(function(){
                    document.getElementById(abuttonid).innerHTML="";
                    document.getElementById(rbuttonid).innerHTML="Rejected";
                })
            }
        })
    
})
}