

var mephoto;
var youphoto;
var mename;
var youname;

document.addEventListener('DOMContentLoaded',function(){

    try{
        let app=firebase.app();
        console.log(app);
    } catch(e){
        console.log(e);
    }
console.log("workking...")





    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');
    const viewid = urlParams.get('viewid');
    console.log(uid);

    let app=firebase.app();
    var db = firebase.firestore(app);
    var msgcount=0;

    db.collection('user').doc(viewid).get().then(snapshot2=>{
        youphoto = snapshot2.data().photourl;
        youname = snapshot2.data().name;
        console.log(youname);
    }).then(function(){
        db.collection('user').doc(uid).get().then(snapshot3=>{
            mephoto = snapshot3.data().photourl;
            mename = snapshot3.data().name;
            console.log(mename);
            document.getElementById('name').innerHTML=youname;
        })
    })
   

// updating chat live
 db.collection('user').doc(uid).collection('chat').doc(viewid).collection('msg').orderBy("time","asc").onSnapshot(snapshot => {
        msgcount=0;
        snapshot.forEach(snap => {
            msgcount=msgcount+1;
        })
        console.log(msgcount);
        {
        var i=1;
        var li=`<li id="0" class="mar-btm"> </li>`
    
        for(i;i<msgcount;i++)
        {
            li=li+`<li id="${i}" class="mar-btm"> </li>`;
        }
    
        document.getElementById('chatbox').innerHTML=li;
        document.getElementById('lmsg').href=`#${i-1}`;
        }


        {
            var i=0;
        db.collection('user').doc(uid).collection('chat').doc(viewid).collection('msg').orderBy('time','asc').get().then(snapshot => {
            snapshot.forEach(snap => {
                if(snap.data().user === "me")
                {
                    document.getElementById(i).innerHTML=`<div class="media-right">
                    <img src="${snap.data().photourl}" class="img-circle img-sm" alt="Profile Picture">
                </div>
                <div class="media-body pad-hor speech-right">
                    <div class="speech">
                        <a href="#" class="media-heading">${snap.data().name}</a>
                        <p>${snap.data().msg}</p>
                        <p class="speech-time">
                            <i class="fa fa-clock-o fa-fw"></i> ${dateformat(snap.data().time)}
                        </p>
                    </div>
                </div>`;
                }
                else if(snap.data().user === "you")
                {
                    document.getElementById(i).innerHTML=`<div class="media-left">
                    <img src="${snap.data().photourl}" class="img-circle img-sm" alt="Profile Picture">
                </div>
                <div class="media-body pad-hor">
                    <div class="speech">
                        <a href="#" class="media-heading">${snap.data().name}</a>
                        <p>${snap.data().msg}</p>
                        <p class="speech-time">
                        <i class="fa fa-clock-o fa-fw"></i>${dateformat(snap.data().time)}
                        </p>
                    </div>
                </div>`;
                }
                i=i+1;
               
            })
            document.getElementById('lmsg').click();
        })        

        } 
    })

       





})

function dateformat(tstamp){
    let time=tstamp.toDate();
    let dateobj=new Date(time);
  
    let month=dateobj.getMonth()+1;
    let year=dateobj.getFullYear();
    let date=dateobj.getDate();
    let hr = dateobj.getHours();
    let ampm = "am"
    if (hr>12)
    {
      hr=hr-12;
      ampm="pm";
    }
    let mint = dateobj.getMinutes();
    let sec = dateobj.getSeconds();
    console.log(`${hr}:${mint}    ${date}/${month}/${year}`);
    return `${hr}:${mint} ${ampm}   (${date}/${month}/${year})`;
  
  }
  var j=-1;
  function sendmsg(){

        const obj = new URLSearchParams(window.location.search);
        const uid = obj.get('uid');
        const viewid = obj.get('viewid');
        console.log(uid);
        console.log(viewid);

        var msg=document.getElementById('msg').value;
       

        let app=firebase.app();
        var db=firebase.firestore(app);



        db.collection('user').doc(uid).collection('chat').doc(viewid).get().then(snapshot => {
            if(snapshot.data() === undefined)
            {
                        db.collection('user').doc(uid).collection('chat').doc(viewid).set({
                            time : firebase.firestore.Timestamp.fromDate(new Date()),
                            photourl : youphoto,
                            name : youname
                        }).then(function(){
                            db.collection('user').doc(viewid).collection('chat').doc(uid).set({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                photourl : mephoto,
                                name : mename
                            })
                        }).then(function(){
                            db.collection('user').doc(uid).collection('chat').doc(viewid).collection('msg').add({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                user : "me",
                                name : mename,
                                msg : msg,
                                photourl : mephoto
                            })
                            console.log(mename+"if me name");
                        });
        
        
                        db.collection('user').doc(viewid).collection('chat').doc(uid).set({
                            time : firebase.firestore.Timestamp.fromDate(new Date()),
                            photourl : mephoto,
                            name : mename
                        }).then(function(){
                            db.collection('user').doc(viewid).collection('chat').doc(uid).collection('msg').add({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                user : "you",
                                name : youname,
                                msg : msg,
                                photourl : youphoto
                            })
                            console.log(youname+"if you name");
                        });
            }
            else
            {
                        db.collection('user').doc(uid).collection('chat').doc(viewid).update({
                            time : firebase.firestore.Timestamp.fromDate(new Date()),
                            photourl : youphoto,
                            name : youname
                        }).then(function(){
                            db.collection('user').doc(viewid).collection('chat').doc(uid).update({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                photourl : mephoto,
                                name : mename
                            })
                        }).then(function(){
                            db.collection('user').doc(uid).collection('chat').doc(viewid).collection('msg').add({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                user : "me",
                                name : mename,
                                msg : msg,
                                photourl : mephoto
                            })
                            console.log(mename+"else me name");
                        });
        
        
                        db.collection('user').doc(viewid).collection('chat').doc(uid).update({
                            time : firebase.firestore.Timestamp.fromDate(new Date()),
                            photourl : mephoto,
                            name : mename
                        }).then(function(){
                            db.collection('user').doc(viewid).collection('chat').doc(uid).collection('msg').add({
                                time : firebase.firestore.Timestamp.fromDate(new Date()),
                                user : "you",
                                name : mename,
                                msg : msg,
                                photourl : mephoto
                            })
                            console.log(youname+"else you name");
                        });

            }
        }).then(function(){
            document.getElementById('msg').value ="";
            // db.collection('user').doc(uid).collection('chat').doc(viewid).collection('msg').where("user","==","me").orderBy("time","desc").limit(1).onSnapshot(function(querySnapshot) {
            //     querySnapshot.forEach(function(doc){
            //         console.log(doc.data());
            //         document.getElementById(j).innerHTML=`<li class="mar-btm">
            //         <div class="media-right">
            //         <img src="${doc.data().photourl}" class="img-circle img-sm" alt="Profile Picture">
            //     </div>
            //     <div class="media-body pad-hor speech-right">
            //         <div class="speech">
            //             <a href="#" class="media-heading">${doc.data().name}</a>
            //             <p>${doc.data().msg}</p>
            //             <p class="speech-time">
            //                 <i class="fa fa-clock-o fa-fw"></i> ${dateformat(doc.data().time)}
            //             </p>
            //         </div>
            //     </div>
            //         </li>
            //         <ul id="${j=j-1}" class="list-unstyled media-block"></ul>`
            //     })
            // })
        })
        
        
    }


    function back()
    {
        const obj=new URLSearchParams(window.location.search);
        const uid=obj.get('uid');
        const viewid=obj.get('viewid')
        window.location.assign(`../profilepage.html?uid=${uid}&viewid=${viewid}`);
    }