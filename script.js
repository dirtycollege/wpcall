const chat = document.getElementById("chat");
const ringtone = document.getElementById("ringtone");
const slideBtn = document.getElementById("slideBtn");

const params = new URLSearchParams(location.search);
const key = params.get("user") || "neha";
const user = USERS[key] || USERS.neha;

document.getElementById("dp").src = user.dp;
document.getElementById("name").innerText = user.name;
document.getElementById("callDp").src = user.dp;
document.getElementById("callName").innerText = user.name;
document.getElementById("callVideo").src = user.video;

window.onload=()=>{
  addMsg(user.auto,"left");
  addSystem("Today");
};

function timeNow(){
  const d=new Date();
  return d.getHours()+":"+String(d.getMinutes()).padStart(2,"0");
}

function addMsg(content,side,isImg=false){
  const d=document.createElement("div");
  d.className="msg "+side;
  if(isImg){
    d.innerHTML=`<img src="${content}"><span class="time">${timeNow()}</span>`;
  }else{
    d.innerHTML=`${content}<span class="time">${timeNow()}</span>`;
  }
  chat.appendChild(d);
  chat.scrollTop=chat.scrollHeight;
}

function addSystem(text){
  const d=document.createElement("div");
  d.className="msg system";
  d.innerText=text;
  chat.appendChild(d);
}

function sendMsg(){
  const m=document.getElementById("msg");
  if(m.value.trim()){
    addMsg(m.value,"right");
    m.value="";
  }
}

function openImage(){
  document.getElementById("img").click();
}

document.getElementById("img").addEventListener("change",(e)=>{
  const file=e.target.files[0];
  if(!file) return;
  const url=URL.createObjectURL(file);
  addMsg(url,"right",true);
  setTimeout(incomingCall,1200);
});

/* CALL LOGIC */
function incomingCall(){
  document.getElementById("call").style.display="flex";
  ringtone.currentTime=0;
  ringtone.play();
}

/* SLIDE UP TO RECEIVE */
let startY=0;
slideBtn.addEventListener("touchstart",e=>{
  startY=e.touches[0].clientY;
});
slideBtn.addEventListener("touchmove",e=>{
  let move=startY - e.touches[0].clientY;
  if(move>60){
    acceptCall();
  }
});

slideBtn.onclick=acceptCall;

function acceptCall(){
  ringtone.pause();
  document.getElementById("call").style.display="none";
  document.getElementById("video").style.display="block";
}

function endCall(){
  document.getElementById("video").style.display="none";
  addMsg("📞 Call ended","left");
}
