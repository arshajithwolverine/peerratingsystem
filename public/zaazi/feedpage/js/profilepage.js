var i=0;
var j=-1;
var ltime;
var mem=10000;

document.addEventListener('DOMContentLoaded', async function() {
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
    const uid = urlParams.get('uid');
    const viewid = urlParams.get('viewid');
    console.log(uid)

    let app = firebase.app()
    var db = firebase.firestore(app)

    if(uid===viewid){
    //rating by friends
    var count=0;
    var rat=0;
    console.log("If entered");
      
     
   await db.collection('user').doc(uid).collection('rating').get().then(snapshot=> {
      snapshot.forEach(snap => {
       
        count=count+1;
        rat=rat+Number(snap.data().rate);
        console.log('count:'+count);

      })
    }).then(function(){
      if(count===0)
      {
        // document.getElementById('rating').innerHTML=`<p>No Friends Rated Yet</p>`;
    }
      else{rat=rat/count;
        console.log('rating:'+rat);
      // document.getElementById('rating').innerHTML=`<p>Friends Rating : ${rat} out of 10</p><br><p>${count} Friends Rated You</p>`;
    }})

// rating by NLP return values
var nlprate=10;
var nlpratecount=0;
 await db.collection('user').doc(uid).collection('nlprating').get().then(snapshot => {
  snapshot.forEach(snap=> {
    nlpratecount = nlpratecount+1;
    nlprate = nlprate + snap.data().rating;
  })
  console.log(nlprate);
  if(nlpratecount !== 0)
  {
  nlprate = nlprate / nlpratecount;
  }
 // document.getElementById('nlprating').innerHTML=`<p>Your Verbal usage rating :${nlprate} </p>`;
});
//rating by post comment count
//1.friend post count
var frndpostcount=0;
var frndpostcommentsofyou=0;
var postrating=0;
await db.collection('user').doc(uid).collection('friends').get().then(async snapshot => {
  snapshot.forEach(snap => {
    db.collection('post').get().then(posts => {
      posts.forEach(post =>{
        
        if (snap.data().userid === post.data().userid)
      {
        frndpostcount=frndpostcount+1;
        
      }
      })
      
    })
  })
}).then(async function(){
//2.frnd post having your comment

 await db.collection('user').doc(uid).collection('friends').get().then(snapshot => {
  snapshot.forEach(async snap => {
    //snap.data().userid;
    await db.collection('post').get().then(posts=>{
      posts.forEach(post=>{
        //post.id;
        if(snap.data().userid === post.data().userid)
        {
        db.collection('post').doc(post.id).collection('comment').get().then(comments =>{
          comments.forEach(comment=>{
            //comment.data().userid;
            console.log(uid);
            console.log(comment.data().userid);
            if(uid===comment.data().userid){
              
              frndpostcommentsofyou=frndpostcommentsofyou+1;
              
            }
          })
          console.log(frndpostcount +":"+ frndpostcommentsofyou);
          postrating = (frndpostcommentsofyou/frndpostcount)*10;
          console.log(postrating);
        }).then(function(){
          
          if(postrating > 10)
          {
            postrating=10;
            console.log(postrating);
            //document.getElementById('postrating').innerHTML=`<p>Your post count rating is <b>${postrating}</b> out of 10 </p>`;
          }
          else{
            console.log(postrating);
            //document.getElementById('postrating').innerHTML=`<p>Your post count rating is <b>${postrating}</b> out of 10 </p>`;
          }
          // final rating
            var f_rate=rat*.2;
            console.log('f rate : '+f_rate);
            var p_rate=postrating*.2;
            console.log('p rate : '+p_rate);
            var n_rate=nlprate*.6;
            console.log('n rate : '+n_rate);

            var final_rate=(f_rate+p_rate+n_rate);
            console.log('final rate : '+final_rate);
            final_rate=final_rate/2;
            console.log('final rate out of 5: '+final_rate);

            if(final_rate < 1)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 2)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 3)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 4)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 5)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate === 5)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`;
            }




            
        });
      
      }
      })
    
    })
  })
})
})


    //details
    db.collection('user').doc(uid).get().then((snapshot) => {
      console.log(snapshot.data());
      document.getElementById('feedreturn1').href =`/zaazi/feedpage/feedpage.html?uid=${uid}`;
      document.getElementById('feedreturn2').href =`/zaazi/feedpage/feedpage.html?uid=${uid}`;
      document.getElementById('profilereturn3').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('profilereturn4').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('useridname').innerHTML = snapshot.data().name;
      document.getElementById('useridimg').src = snapshot.data().photourl;
      document.getElementById('useridimg1').src = snapshot.data().photourl;
      document.getElementById('useridimg2').src = snapshot.data().photourl;
      document.getElementById('useriddetails').innerHTML = snapshot.data().name+"<br>"+snapshot.data().email;
      document.getElementById('about1').innerHTML =snapshot.data().name;
      if(snapshot.data().about === "" ){
      document.getElementById('aboutme').innerHTML = "This field is empty";
      }
      else{
        document.getElementById('aboutme').innerHTML =snapshot.data().about
      }
      
    })


   
  }
  else{
    //rating by friends
    db.collection('user').doc(uid).collection('friends').get().then(snapshot => {
      snapshot.forEach(snap => {
        if(snap.data().userid === viewid)
        {
    db.collection('user').doc(viewid).collection('rating').doc(uid).get().then(snapshot =>{
      if(snapshot.data()===undefined)
      {
        document.getElementById('rating').setAttribute('class','btn btn-default');
        document.getElementById("rating").innerHTML=`Rate Out of 10 <input type="number" id="ratevalue"><input type="submit" onclick="rate('${uid}','${viewid}')">`;
      }
      else{
        document.getElementById('rating').setAttribute('class','btn btn-default');
      document.getElementById("rating").innerHTML=`Rate Out of 10 <input type="number" id="ratevalue" placeholder="${snapshot.data().rate}"><input type="submit" onclick="rate('${uid}','${viewid}')">`;
    }})

  }
})
})
var count=0;
   var rat=0;
    console.log("If entered");
      
     
    await db.collection('user').doc(viewid).collection('rating').get().then(snapshot=> {
      snapshot.forEach(snap => {
       
        count=count+1;
        rat=rat+Number(snap.data().rate);
        console.log("count:"+count);

      })
    }).then(function(){
      if(count===0)
      {
        //document.getElementById('ratingshow').innerHTML="<p>No Rating Yet</p>"
      }
      else{
        console.log("rat:"+rat);
        rat=rat/count;
        console.log("rat:"+rat);
      //document.getElementById('ratingshow').innerHTML=`<p>Account Rating : ${rat} out of 10</p><br><p>${count} People Rated this Account</p>`;
    }})

    // rating by NLP return values
var nlprate=10;
var nlpratecount=0;

await db.collection('user').doc(viewid).collection('nlprating').get().then( snapshot => {
 
  snapshot.forEach(snap=> {
    
    nlpratecount = nlpratecount+1;
    nlprate = nlprate + snap.data().rating;
  
  })


  console.log(nlprate);
  if(nlpratecount===0)
  {

  }
  else{
  nlprate = nlprate / nlpratecount;
  }
  console.log(nlprate);
  //document.getElementById('nlprating').innerHTML=`<p>Your Verbal usage rating :${nlprate} </p>`;
});

    //rating by post comment count
//1.friend post count
var frndpostcount=0;
var frndpostcommentsofyou=0;
var postrating=0;
await db.collection('user').doc(viewid).collection('friends').get().then(snapshot => {
  snapshot.forEach(snap => {
    db.collection('post').get().then(posts => {
      posts.forEach(post =>{
        
        if (snap.data().userid === post.data().userid)
      {
        frndpostcount=frndpostcount+1;
        
      }
      })
      
    })
  })
})
//2.frnd post having your comment

 await db.collection('user').doc(viewid).collection('friends').get().then(snapshot => {
  snapshot.forEach(snap => {
    snap.data().userid;
    db.collection('post').get().then(posts=>{
      posts.forEach(post=>{
        post.id;
        if(snap.data().userid === post.data().userid)
        {
        db.collection('post').doc(post.id).collection('comment').get().then(comments =>{
          comments.forEach(comment=>{
            comment.data().userid;
            console.log(viewid);
            console.log(comment.data().userid);
            if(viewid===comment.data().userid){
              
              frndpostcommentsofyou=frndpostcommentsofyou+1;
              
            }
          })
          console.log(frndpostcount +":"+ frndpostcommentsofyou);
          postrating = (frndpostcommentsofyou/frndpostcount)*10;
          console.log(postrating);
        }).then(function(){
          
          if(postrating > 10)
          {
            postrating=10;
            console.log(postrating);
            //document.getElementById('postrating').innerHTML=`<p>Account's post count rating is <b>${postrating}</b> out of 10 </p>`;
          }else{
            console.log(postrating);
            //document.getElementById('postrating').innerHTML=`<p>Account's post count rating is <b>${postrating}</b> out of 10 </p>`;
          }

          // final rating
          var f_rate=rat*.2;
          console.log('f rate : '+f_rate);
          var p_rate=postrating*.2;
          console.log('p rate : '+p_rate);
          var n_rate=nlprate*.6;
          console.log('n rate : '+n_rate);

          var final_rate=(f_rate+p_rate+n_rate);
          console.log('final rate : '+final_rate);
          final_rate=final_rate/2;
          console.log('final rate out of 5: '+final_rate);

          if(final_rate < 1)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 2)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 3)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star "></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 4)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate < 5)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>`;
            }
            else if(final_rate === 5)
            {
              document.getElementById('starrate').innerHTML=`
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>`;
            }

        });
      
      }
      })
    
    })
  })


})





   
    //details
    db.collection('user').doc(uid).get().then((snapshot) => {
      console.log(snapshot.data());
      document.getElementById('feedreturn1').href =`/zaazi/feedpage/feedpage.html?uid=${uid}`;
      document.getElementById('feedreturn2').href =`/zaazi/feedpage/feedpage.html?uid=${uid}`;
      document.getElementById('profilereturn3').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('profilereturn4').href =`/zaazi/feedpage/profilepage.html?uid=${uid}&viewid=${uid}`;
      document.getElementById('useridname').innerHTML = snapshot.data().name;
      document.getElementById('useridimg').src = snapshot.data().photourl;
      // document.getElementById('useridimg1').src = snapshot.data().photourl;
      document.getElementById('useridimg2').src = snapshot.data().photourl;
      document.getElementById('useriddetails').innerHTML = snapshot.data().name+"<br>"+snapshot.data().email;
      // document.getElementById('about1').innerHTML =snapshot.data().name;

      document.getElementById('abtvanish').innerHTML="";
      document.getElementById('addpostvanish').innerHTML="";
      
      
    })

    db.collection('user').doc(viewid).get().then(snapshot => {
      document.getElementById('useridimg1').src = snapshot.data().photourl;
      document.getElementById('about1').innerHTML =`${snapshot.data().name}<br> <small id="aboutmeappear"> </small>`;
      document.getElementById('editprofvanish').innerHTML ="";
      if(snapshot.data().about === "" ){
        document.getElementById('aboutmeappear').innerHTML = "";
        }
        else{
          document.getElementById('aboutmeappear').innerHTML = snapshot.data().about;
        }
    })




    //friend req
    friendflag=0;
    db.collection('user').doc(uid).collection('friends').get().then(snapshot => {
      snapshot.forEach(snap => {
        if(snap.data().userid === viewid)
        {
          document.getElementById('friendreq').innerHTML=`<input class="btn btn-default" type="button" value="Friends" ><input onclick="chat('${uid}','${viewid}')" class="btn btn-default" type="button" value="Message" >`;
          friendflag=1;
        }
      })
    }).then(function(){
      
      db.collection('user').doc(uid).collection('friendreq').get().then(snapshot => {
        snapshot.forEach(snap => {
          if(snap.data().userid === viewid)
          {
            document.getElementById('friendreq').innerHTML=`Friend Request : <input class="btn btn-default" type="button" value="Accept" onclick=acceptreq('${uid}','${viewid}')>   <input class="btn btn-default" type="button" value="Reject" onclick=reject('${uid}','${viewid}')>`;
            friendflag=1;
          }
        })
      })
    }).then(function(){
      if (friendflag === 0)
      {
        document.getElementById('friendreq').innerHTML=`<input class="btn btn-default" type="button" value="Friend Request" onclick=frndreq('${uid}','${viewid}')>`;
        db.collection('user').doc(viewid).collection('friendreq').get().then(snapshot => {
        snapshot.forEach(snap => {
          if(snap.data().userid === uid)
          {
            
              var c = document.getElementById('friendreq').children;
              c[0].value="Requset Sent";
              reqcancel=1;
            
          }
        })
      })
      }
    })

    


    
  }
   
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
    
    db.collection('post').where("userid","==",viewid).orderBy("time","desc").limit(2).get().then((snapshot) => {
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
//Rating

function rate(uid,viewid)
  {
    let app=firebase.app();
    var db=firebase.firestore(app);

    var rating=document.getElementById('ratevalue').value;
    if(rating<0 || rating >10)
    {
      alert("Rate Value Between 0 and 10")
    }
    else{
      db.collection('user').doc(viewid).collection('rating').doc(uid).set({
        rate : rating
      }).then(function(){
        alert("Rated successfully");
      })
    }
  }


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

      db.collection('post').where("time","<",ltime).where("userid","==",viewid).orderBy("time","desc").limit(2).get().then((snapshot) => {
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

  //friend req
  var reqcancel = 0;
  function frndreq(user,viewer){
    let app = firebase.app();
    var db = firebase.firestore(app);

    if(reqcancel === 0){
    db.collection('user').doc(user).get().then(snapshot => {
      db.collection('user').doc(viewer).collection('friendreq').add({
        userid : user,
        name : snapshot.data().name,
        time : firebase.firestore.Timestamp.fromDate(new Date()),
        photourl : snapshot.data().photourl
  
      }).then(function(){
        var c = document.getElementById('friendreq').children;
        c[0].value="Request Sent";
        reqcancel=1;
      })
    })

  }else{
    db.collection('user').doc(viewer).collection('friendreq').get().then(snapshot => {
      snapshot.forEach(snap => {
        if(snap.data().userid === user)
        {
          db.collection('user').doc(viewer).collection('friendreq').doc(snap.id).delete().then(function(){
            var c = document.getElementById('friendreq').children;
            c[0].value="Friend Request";
            reqcancel=0;
          })
        }
      })
    })

      
    
  }
   
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

  function acceptreq(uid,viewid){
    let app=firebase.app();
    var db= firebase.firestore(app);

    db.collection('user').doc(viewid).get().then(snapshot => {
    db.collection('user').doc(uid).collection('friends').add({
        userid : viewid,
        name : snapshot.data().name,
        time : firebase.firestore.Timestamp.fromDate(new Date()),
        photourl : snapshot.data().photourl
    }).then(function(){
      document.getElementById('friendreq').innerHTML=`<input class="btn btn-default" type="button" value="Friends" >`;

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


function reject(uid,viewid)
{
    let app=firebase.app();
    var db= firebase.firestore(app);

    db.collection('user').doc(uid).collection('friendreq').get().then(snapshot => {
        snapshot.forEach(snap => {
            if(snap.data().userid === viewid)
            {
                db.collection('user').doc(uid).collection('friendreq').doc(snap.id).delete().then(function(){
                  document.getElementById('friendreq').innerHTML=`<input class="btn btn-default" type="button" value="Friend Request" onclick=frndreq('${uid}','${viewid}')>`;
                  reqcancel=0;
                })
            }
        })
    
})
}

function viewmsg(){
  const obj = new URLSearchParams(window.location.search);
  const uid = obj.get('uid');
  const viewid = obj.get('viewid');

  window.location.assign(`chat/chatlist.html?uid=${uid}`);
}

function chat(me,you){
  window.location.assign(`chat/chat.html?uid=${me}&viewid=${you}`);
}