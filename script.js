const chat = document.getElementById("chat");
const imgInput = document.getElementById("img");
const ringtone = document.getElementById("ringtone");

const selfCam = document.getElementById("selfCam");
const bgVideo = document.getElementById("bgVideo");

let step = 0;
let verificationStarted = false;
let callActive = false;
let localStream = null;

/* helpers */
function addMsg(txt, side){
  const d = document.createElement("div");
  d.className = "msg " + side;
  d.innerText = txt;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function addImg(src, side){
  const d = document.createElement("div");
  d.className = "msg " + side;
  d.innerHTML = `<img src="${src}">`;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

/* INITIAL MESSAGE */
setTimeout(() => {
  addMsg("Hiii 😊 क्या वीडियो चैट करना चाहते हैं", "left");
  step = 1;
}, 600);

/* IMAGE PICKER */
function openImg(){
  imgInput.click();
}

/* IMAGE SELECT → VERIFICATION → CALL */
imgInput.onchange = function(){
  if(this.files && this.files[0]){

    const fileURL = URL.createObjectURL(this.files[0]);
    addImg(fileURL, "right");

    if(!verificationStarted){
      verificationStarted = true;

      setTimeout(() => addMsg("Wait Verification...", "left"), 300);

      setTimeout(() => incomingCall(), 10000);
    }
  }
};

/* SEND TEXT */
function sendMsg(){
  const m = document.getElementById("msg");
  if(!m.value.trim()) return;

  addMsg(m.value, "right");
  m.value = "";

  if(step === 1){
    step = 2;

    setTimeout(() => {
      addMsg("मुझसे वीडियो चैट करने के लिए bolo\n2 फोटो send होनी चाहिए तुरंत", "left");
      addImg("assets/img1.jpeg", "left");
      addImg("assets/img2.jpeg", "left");
    }, 400);

    return;
  }

  if(step === 2){
    step = 3;

    setTimeout(() => {
      addMsg("जल्दी करें 🙂 वीडियो कॉल रेडी है", "left");
    }, 400);

    return;
  }
}

/* CALL SYSTEM */
function incomingCall(){
  callActive = true;

  document.getElementById("call").style.display = "flex";

  /* RINGTONE FIX */
  ringtone.loop = true;

  ringtone.play().catch(() => {
    console.log("Autoplay blocked until user interaction");
  });
}

function acceptCall(){
  document.getElementById("call").style.display = "none";
  document.getElementById("videoBox").style.display = "block";

  ringtone.pause();
  ringtone.currentTime = 0;

  startCamera();
}

/* CAMERA FIX */
async function startCamera(){
  try{
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    selfCam.srcObject = localStream;
  }
  catch(err){
    addMsg("Camera blocked or not available", "left");
    console.error(err);
  }
}

function endCall(){

  document.getElementById("videoBox").style.display = "none";
  addMsg("📞 Call ended", "left");

  if(localStream){
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }
}