var i=0;
var j=-1;
var ltime;
var mem=10000;

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



    

//  onload user details
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid')
    console.log(uid)

    let app = firebase.app()
    var db = firebase.firestore(app)
    db.collection('user').doc(uid).get().then((snapshot) => {
      console.log(snapshot.data());
      document.getElementById('profilereturn1').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('profilereturn2').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('useridname').innerHTML = snapshot.data().name;
      document.getElementById('useridimg').src = snapshot.data().photourl;
      document.getElementById('useridimg1').src = snapshot.data().photourl;
      document.getElementById('useridimg2').src = snapshot.data().photourl;
      document.getElementById('useriddetails').innerHTML = snapshot.data().name+"<br>"+snapshot.data().email;
      document.getElementById('about1').innerHTML =snapshot.data().name;
      
    })
   
// dark theme

    db.collection('user').doc(uid).get().then(snapshot => {
      if (snapshot.data().dark === '0')
      {
        document.getElementById('body').style="background-size:cover; background-color: whitesmoke;";
        document.getElementById('dmode').style=" background-color: whitesmoke;";
        document.getElementById('dmodename').color="#282d32";
      }
      else{
        document.getElementById('body').style="background-size:cover; background-color: #282d32;";
        document.getElementById('dmode').style=" background-color: #282d32;";
        document.getElementById('dmodename').color="white";
        document.getElementById('darkmode').checked = true;
      }
    })

    

    // onload posts
    
    db.collection('post').orderBy("time","desc").limit(2).get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data())
        ltime=doc.data().time;

        var lcount=0;
        db.collection('post').doc(doc.id).collection('likes').get().then((snap)=>{
          snap.forEach(doc => {
            lcount=lcount+1;
          })
        }).then(function(){

        var ccount=0;
        db.collection('post').doc(doc.id).collection('comment').get().then((shot)=>{
          shot.forEach(com => {
            ccount=ccount+1;
          })
        }).then(function(){  
      document.getElementById(i).innerHTML=`<div style="border-style: groove; border-color: white; padding: 10px;"><div class="user-block">
      <img class="img-circle img-bordered-sm" src="${doc.data().photourl}" id="postuserimg" alt="user image">
      <span class="username">
        <a href="/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${doc.data().userid}">${doc.data().name}</a>
      </span>
      <span class="description">${dateformat(doc.data().time)}</span>
    </div>
    <!-- /.user-block -->
    <p id="placepost">${doc.data().writepost}
      
    </p>
    <ul class="list-inline">
      <button onclick="like('${doc.id}','lcount${i}')" class="btn btn-default" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;">
       <i class="glyphicon glyphicon-heart" data-aos="flip-right"></i><span id="lcount${i}"> ${lcount} Likes</span></button>
      <button onclick="viewcomment('${doc.id}','com${i}','comcount${i}')" class="btn btn-default comment" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;">
        <i  class="glyphicon glyphicon-flash" style="color:#f9d616;"></i><span id="comcount${i}" style="color:#f9d616;"> ${ccount} Comments</span></button>
        <li><a href="#" class="link-black text-sm"><i class="fa fa-share margin-r-5"></i> Share</a></li>
      </ul>

      <div id="com${i}" class="list-group" >
      <div></div>
      <input  type="text" onclick="set('${doc.id}','com${i}')" class="form-control"  placeholder="Comment">
      
        <button type="submit" onclick="addcom('${doc.id}','com${i}','comcount${i}')" class="btn btn-danger pull-right btn-block btn-sm" style="background-image:url(&quot;none&quot;);background-color:#da052b;color:#fff;padding:7px">Comment</button>
      </div><br>
      </div><br>
      <div id=${i=i+1}></div>`
        })
      })
      })
    })
  
  // new members
  var memtemp=0;
  var c=document.getElementById(mem).children;
      db.collection('user').orderBy("time","desc").limit(16).get().then(snapshot => {
        snapshot.forEach( shot => {
            c[memtemp].innerHTML=`
            <img   src="${shot.data().photourl}" alt="User Image">
            <a href="/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${shot.id}" class="users-list-name" href="#">${shot.data().name}</a>
            <span class="users-list-date">${dateformat(shot.data().time)}</span>`
            memtemp=memtemp+1;
        })
      })

    
  });



	function dark(){
    console.log("entered");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    let app=firebase.app();
    var db=firebase.firestore(app);

    if(document.getElementById('darkmode').checked===true){
      console.log("checked");
      document.getElementById('body').style="background-size:cover; background-color: #282d32;";
      document.getElementById('dmode').style=" background-color: #282d32;";
      document.getElementById('dmodename').color="white";
      db.collection('user').doc(uid).update({
        dark : '1'
      }).then(console.log("success dark"));
    }
    else{
      document.getElementById('body').style="background-size:cover; background-color: whitesmoke;";
      document.getElementById('dmode').style=" background-color: whitesmoke;";
      document.getElementById('dmodename').color="#282d32";
      db.collection('user').doc(uid).update({
        dark : '0'
      }).then(console.log("success dark"));
    }
  }
  
	function dark2(){
    console.log("entered");

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    let app=firebase.app();
    var db=firebase.firestore(app);
    
    if(document.getElementById('darkmode2').checked===true){
      console.log("checked");
      document.getElementById('body').style="background-size:cover; background-color: #282d32;";
      document.getElementById('dmode').style=" background-color: #282d32;";
      document.getElementById('dmodename').color="white";
      db.collection('user').doc(uid).update({
        dark : '1'
      }).then(console.log("success dark"));
    }
    else{
      document.getElementById('body').style="background-size:cover; background-color: whitesmoke;";
      document.getElementById('dmode').style=" background-color: whitesmoke;";
      document.getElementById('dmodename').color="#282d32";
      db.collection('user').doc(uid).update({
        dark : '0'
      }).then(console.log("success dark"));
    }
  }


  function morepost(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const viewid = urlParams.get('viewid');
    const uid = urlParams.get('uid');

      var app=firebase.app();
      db=firebase.firestore(app);

      db.collection('post').where("time","<",ltime).orderBy("time","desc").limit(2).get().then((snapshot) => {
      snapshot.forEach(doc => {
        console.log(doc.data())
        ltime=doc.data().time;
        var lcount=0;
        db.collection('post').doc(doc.id).collection('likes').get().then((snap)=>{
          snap.forEach(doc => {
            lcount=lcount+1;
          })
        }).then(function(){
        var ccount=0;
        db.collection('post').doc(doc.id).collection('comment').get().then((shot)=>{
          shot.forEach(com => {
            ccount=ccount+1;
          })
        }).then(function(){  
      document.getElementById(i).innerHTML=`<div style="border-style: groove; border-color: white; padding: 10px;"><div class="user-block">
      <img class="img-circle img-bordered-sm" src="${doc.data().photourl}" id="postuserimg" alt="user image">
      <span class="username">
        <a href="/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${doc.data().userid}">${doc.data().name}</a>
      </span>
      <span class="description">${dateformat(doc.data().time)}</span>
    </div>
    <!-- /.user-block -->
    <p id="placepost">${doc.data().writepost}
      
    </p>
    <ul class="list-inline">
      <button onclick="like('${doc.id}','lcount${i}')" class="btn btn-default" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;">
       <i class="glyphicon glyphicon-heart" data-aos="flip-right"></i><span id="lcount${i}"> ${lcount} Likes</span></button>
      <button onclick="viewcomment('${doc.id}','com${i}','comcount${i}')" class="btn btn-default comment" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;">
        <i  class="glyphicon glyphicon-flash" style="color:#f9d616;"></i><span id="comcount${i}" style="color:#f9d616;"> ${ccount} Comments</span></button>
        <li><a href="#" class="link-black text-sm"><i class="fa fa-share margin-r-5"></i> Share</a></li>
      </ul>

      <div id="com${i}" class="list-group">
      <div></div>
      <input  type="text" onclick="set('${doc.id}','com${i}')" class="form-control"  placeholder="Comment">
      <span class="input-group-btn">
        <button type="submit" onclick="addcom('${doc.id}','com${i}','comcount${i}')" class="btn btn-danger pull-right btn-block btn-sm" style="background-image:url(&quot;none&quot;);background-color:#da052b;color:#fff;padding:7px">Comment</button>
      </span>
      </div></div><br>
      <div id=${i=i+1}></div>`
        })
      })
      })
    })
  }


  function aboutmefn(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid')
    console.log(uid)


    let app = firebase.app();
    var db = firebase.firestore(app);

    db.collection('user').doc(uid).update({
      about: document.getElementById('aboutmeupdate').value
    }).then(function(){
    document.getElementById('aboutme').innerHTML = document.getElementById('aboutmeupdate').value;
    document.getElementById('aboutmeupdate').value = "";
  })

  }

  function addpost(){
    const queryString=window.location.search;
    const urlParams=new URLSearchParams(queryString);
    const uid=urlParams.get('uid');
    console.log(uid);

    let app=firebase.app()
    var db=firebase.firestore(app);
    if(document.getElementById('uidpost').value==="")
      {alert("Write anything to post!!!");}
    else{
    db.collection("user").doc(uid).get().then((snapshot) => {
      db.collection("post").add({
        userid : uid,
        photourl: snapshot.data().photourl,
        name : snapshot.data().name,
        time : firebase.firestore.Timestamp.fromDate(new Date()),
        writepost : document.getElementById('uidpost').value
      }).then(function() {
        document.getElementById("uidpost").value=""
        document.getElementById("uidpost").placeholder="Posted "
      })
      
      db.collection('post').orderBy("time","desc").limit(1).get().then((snapshot) => {
        snapshot.forEach(doc => {
          console.log(doc.data())
//test time

// let time = doc.data().time.toDate();
// console.log(time);
// let tobj=new Date(time);
// console.log(tobj);
// console.log(`${tobj.getFullYear()}`);
// console.log("timeeeeeeee");
         

        document.getElementById(j).innerHTML=`<div id=${j=j-1}></div><div style="border-style: groove; border-color: white; padding: 10px;"><div class="user-block">
        <img class="img-circle img-bordered-sm" src="${doc.data().photourl}" id="postuserimg" alt="user image">
        <span class="username">
          <a href="/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${doc.data().userid}">${doc.data().name}</a>
        </span>
        <span class="description">${dateformat(doc.data().time)}</span>
      </div>
      <!-- /.user-block -->
      <p id="placepost">${doc.data().writepost}
        
      </p>
      <ul class="list-inline">
        <button onclick="like('${doc.id}','lcount${j}')" class="btn btn-default" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;"> 
        <i class="glyphicon glyphicon-heart" data-aos="flip-right"></i><span id="lcount${j}"> 0 Likes</span></button>
        <button onclick="viewcomment('${doc.id}','com${j}','comcount${j}')" class="btn btn-default comment" type="button" style="color:#eb3b60;background-image:url(&quot;none&quot;);background-color:transparent;">
          <i  class="glyphicon glyphicon-flash" style="color:#f9d616;"></i><span id="comcount${j}" style="color:#f9d616;"> 0 Comments</span></button>
          <li><a href="#" class="link-black text-sm"><i class="fa fa-share margin-r-5"></i> Share</a></li>
        </ul>
          
          
        <div id="com${j}" class="list-group"> 
        <p></p>
          <input  type="text" onclick="set('${doc.id}','com${j}')" class="form-control"  placeholder="Comment">
          <span class="input-group-btn">
            <button type="submit" onclick="addcom('${doc.id}','com${j}','comcount${j}')" class="btn btn-danger pull-right btn-block btn-sm" style="background-image:url(&quot;none&quot;);background-color:#da052b;color:#fff;padding:7px">Comment</button>
          </span>
        </div>
        </div><br>`
      
        })
      })
        
    })
  }
 }

  function set(pid,comid)
  {
    var c=document.getElementById(comid).children;
    console.log(c[0]);
    c[0].innerHTML="";
    v=0;
  }
  
  function addcom(pid,comid,countid)
  {
    console.log(pid);
    console.log(comid);
    console.log(countid)

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    var app=firebase.app();
    db=firebase.firestore(app);
    var c=document.getElementById(comid).children;
    if(c[1].value==="")
    {
      alert("Write Anything to Comment!!!");
    }
    else{
    db.collection("user").doc(uid).get().then((shot)=>{
    console.log(shot.data().name);
    db.collection("post").doc(pid).collection("comment").add({
      flag : 0,
      comment : c[1].value,
      userid : uid,
      uname : shot.data().name,
      ctime : firebase.firestore.Timestamp.fromDate(new Date())
    }).then(function(){
      c[1].value="";
      var ccount=0;
        db.collection('post').doc(pid).collection('comment').get().then((shot)=>{
          shot.forEach(com => {
            ccount=ccount+1;
          })
        }).then(function(){  
      db.collection("post").doc(pid).collection("comment").orderBy("ctime").get().then((snapshot)=>{
        snapshot.forEach(doc=>{
          document.getElementById(countid).innerHTML=`${ccount} Comments`;
          if(c[0].innerHTML===""){
            c[0].innerHTML=`<p>${doc.data().uname}<br>${doc.data().comment}<br>${dateformat(doc.data().ctime)}</p>`}
          else{
            c[0].innerHTML=`<p>${doc.data().uname}<br>${doc.data().comment}<br>${dateformat(doc.data().ctime)}</p>`}
        })
      })
    })

    })
  })
}
}

function like(pid,likeid)
{
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');
    var check=1;
    let app = firebase.app();
    db = firebase.firestore(app);
    var lcount=0;
    db.collection('post').doc(pid).collection('likes').get().then((snapshot) => {

    snapshot.forEach(doc => {
        if(doc.data().userid===uid)
        {
          check=0;
        }      
        lcount=lcount+1;
    })
   
}).then(function(){
  if(check===1){
db.collection('user').doc(uid).get().then((shot) => {
        
  db.collection('post').doc(pid).collection('likes').add({
    userid : uid,
    uname : shot.data().name,
    ltime :  firebase.firestore.Timestamp.fromDate(new Date())
  })
}).then(function(){
  document.getElementById(likeid).innerHTML=`${lcount+1} Likes`;
})
  }
  else{
    db.collection("post").doc(pid).collection('likes').get().then((snapshot) => {
      snapshot.forEach(doc => {
        if(doc.data().userid===uid)
        {
          db.collection("post").doc(pid).collection('likes').doc(doc.id).delete().then(function() {
          console.log("Document successfully deleted!");
        })
        }
      })
    })
   
    document.getElementById(likeid).innerHTML=`${lcount-1} Likes`;
  }
})
}



  var v=0;
  function viewcomment(pid,comid,countid){
  
    var app=firebase.app();
    db=firebase.firestore(app);
    var c=document.getElementById(comid).children;
    c[0].innerHTML="";
    var ccount=0;
        db.collection('post').doc(pid).collection('comment').get().then((shot)=>{
          shot.forEach(com => {
            ccount=ccount+1;
          })
        }).then(function(){
          document.getElementById(countid).innerHTML=`${ccount} Comments`;
    if (v===0){
      
      db.collection("post").doc(pid).collection("comment").orderBy("ctime","desc").get().then((snapshot)=>{
      snapshot.forEach(doc=>{
        if(c[0].innerHTML===""){
        c[0].innerHTML=`<p>${doc.data().uname}<br>${doc.data().comment}<br>${dateformat(doc.data().ctime)}</p>`}
        else{
          
          var node = document.createElement("BR");
          var u = document.createTextNode(`${doc.data().uname}`);
          c[0].appendChild(node);
          c[0].appendChild(u);

          var node1 = document.createElement("BR");
          var co = document.createTextNode(`${doc.data().comment}`);
          c[0].appendChild(node1);
          c[0].appendChild(co);

          var node2 = document.createElement("BR");
          var t = document.createTextNode(`${dateformat(doc.data().ctime)}`);
          c[0].appendChild(node2);
          c[0].appendChild(t);
          var node3 = document.createElement("BR");
          c[0].appendChild(node3);
          var node4 = document.createElement("BR");
          c[0].appendChild(node4);
          
          
        }
      })
    })
    v=1;
  }
  else {
    c[0].innerHTML="";
      v=0;
      }
    })
  }


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

  function editprof()
  {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    window.location.assign(`/zaazi/profinfoedit.html?uid=${uid}`,"_self");
  }
  function viewfriendreq(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    window.location.assign(`/zaazi/feedpage/friendlist.html?uid=${uid}`,'_self');
  }
  function viewfriends(){

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const uid = urlParams.get('uid');

    window.location.assign(`/zaazi/feedpage/friends.html?uid=${uid}`,'_self');
  }

  function viewmsg(){
    const obj = new URLSearchParams(window.location.search);
    const uid = obj.get('uid');
    const viewid = obj.get('viewid');
  
    window.location.assign(`chat/chatlist.html?uid=${uid}`);
  }