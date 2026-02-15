const chat = document.getElementById("chat");
const imgInput = document.getElementById("img");
const ringtone = document.getElementById("ringtone");

const selfCam = document.getElementById("selfCam");

let verificationStarted = false;
let callActive = false;
let localStream = null;

let repeatTimer = null;

/* helpers */
function addMsg(txt, side){
  const d = document.createElement("div");
  d.className = "msg " + side;
  d.innerText = txt;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

function addHTML(txt, side){
  const d = document.createElement("div");
  d.className = "msg " + side;
  d.innerHTML = txt;
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

  startRepeatingMessages();
}, 600);

/* REPEATING MESSAGE LOGIC */
function startRepeatingMessages(){

  repeatTimer = setInterval(() => {

    if(!verificationStarted){
      addMsg("वीडियो कॉल रेडी है 🙂\n1 फोटो send करें", "left");
    }

  }, 3000); // हर 3 सेकंड
}

function stopRepeatingMessages(){
  clearInterval(repeatTimer);
}

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

      stopRepeatingMessages();

      setTimeout(() => addMsg("Wait Verification...", "left"), 300);

      setTimeout(() => incomingCall(), 10000);
    }
  }
};

/* CALL SYSTEM */
function incomingCall(){
  callActive = true;

  document.getElementById("call").style.display = "flex";

  ringtone.loop = true;
  ringtone.play().catch(() => {});
}

function acceptCall(){
  document.getElementById("call").style.display = "none";
  document.getElementById("videoBox").style.display = "block";

  ringtone.pause();
  ringtone.currentTime = 0;

  startCamera();
}

/* CAMERA */
async function startCamera(){
  try{
    localStream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    });

    selfCam.srcObject = localStream;
  }
  catch(err){
    addMsg("Camera blocked", "left");
  }
}

function endCall(){

  document.getElementById("videoBox").style.display = "none";

  if(localStream){
    localStream.getTracks().forEach(t => t.stop());
    localStream = null;
  }

  addMsg("📞 Call ended", "left");

  /* SPECIAL MESSAGE AFTER CUT */
  setTimeout(() => {

    addHTML(
      `और बात करने के लिए फ्री क्रेडिट प्राप्त करें<br>
       <a href="https://dirtypush.com" target="_blank">Free Credit Here</a>`,
      "left"
    );

  }, 500);
}