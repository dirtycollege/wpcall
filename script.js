const chat=document.getElementById("chat");
const ringtone=document.getElementById("ringtone");

const p=new URLSearchParams(location.search);
const key=p.get("user")||"neha";
const user=USERS[key];

document.getElementById("dp").src=user.dp;
document.getElementById("name").innerText=user.name;
document.getElementById("callDp").src=user.dp;
document.getElementById("callName").innerText=user.name;

let camStream=null;
let helloDone=false;
let verificationStarted=false;

/* helpers */
function addMsg(txt,side){
  const d=document.createElement("div");
  d.className="msg "+side;
  d.innerText=txt;
  chat.appendChild(d);
  chat.scrollTop=chat.scrollHeight;
}
function addImg(src,side){
  const d=document.createElement("div");
  d.className="msg "+side;
  d.innerHTML=`<img src="${src}">`;
  chat.appendChild(d);
  chat.scrollTop=chat.scrollHeight;
}

/* auto hi */
setTimeout(()=>addMsg("Hi 😊 क्या मुझसे वीडियो कॉल बात करना चाहते हैं?","left"),600);

/* send text */
function sendMsg(){
  const m=document.getElementById("msg");
  if(!m.value.trim()) return;

  addMsg(m.value,"right");
  m.value="";

  // user kuch bhi likhe – sirf first message par auto flow
  if(!helloDone){
    helloDone = true;

    setTimeout(()=>{
      addMsg("मुझसे सेक्स चैट या वीडियो कॉल करना है तो इस QR पर ₹49 पेमेंट कराे...और पेमेंट मिलते ही आपको हमारी तरफ से वीडियो कॉल किया जायेगा विश्वास न हो तो कोई अपनी फोटो या पेमेंट स्कीनशोर्ट भेजो फिर देखो |","left");
    },800);

    setTimeout(()=>{
      addImg("assets/verify1.jpeg","left");
    },1500);

    setTimeout(()=>{
      addImg("assets/verify2.jpeg","left");
    },2200);
  }
}
  
function openImg(){
  document.getElementById("img").click();
}

/* image send */
document.getElementById("img").addEventListener("change",e=>{
  const f=e.target.files[0];
  if(!f)return;

  addImg(URL.createObjectURL(f),"right");

  if(!verificationStarted){
    verificationStarted=true;

    /* 15 sec hidden wait */
    setTimeout(()=>{
      addMsg("please wait for verification","left");
    },15000);

    setTimeout(()=>{
      addMsg("वीडियो कॉल रेडी है","left");
    },17000);

    setTimeout(()=>{
      incomingCall();
    },19000);
  }
});

/* CALL */
function incomingCall(){
  document.getElementById("call").style.display="flex";
  ringtone.currentTime=0;
  ringtone.play();
}

async function acceptCall(){
  ringtone.pause();
  document.getElementById("call").style.display="none";
  document.getElementById("videoBox").style.display="block";

  const bg=document.getElementById("bgVideo");
  bg.src=user.video;
  bg.play();

  try{
    camStream=await navigator.mediaDevices.getUserMedia({
      video:{facingMode:"user"},
      audio:false
    });
    document.getElementById("selfCam").srcObject=camStream;
  }catch(e){
    alert("Camera permission denied");
  }
}

function endCall(){
  document.getElementById("videoBox").style.display="none";
  addMsg("📞 Call ended","left");
  if(camStream){
    camStream.getTracks().forEach(t=>t.stop());
    camStream=null;
  }
}