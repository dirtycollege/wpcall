const chat = document.getElementById("chat");
const imgInput = document.getElementById("img");
const ringtone = document.getElementById("ringtone");
const selfCam = document.getElementById("selfCam");

let step = 0;
let verificationMode = false;
let verificationStep = 0;
let localStream = null;

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

/* ONLY ONE INITIAL MESSAGE */
setTimeout(() => {
  addMsg("Hiii 😊 क्या वीडियो चैट करना चाहते हैं", "left");
  step = 1;
}, 600);

/* IMAGE BUTTON */
function openImg(){
  imgInput.click();
}

/* IMAGE भेजते ही CALL */
imgInput.onchange = function(){
  if(this.files && this.files[0]){

    const fileURL = URL.createObjectURL(this.files[0]);
    addImg(fileURL, "right");

    addMsg("Wait Verification...", "left");

    setTimeout(incomingCall, 1000);
  }
};

/* SEND TEXT */
function sendMsg(){

  const input = document.getElementById("msg");
  const rawText = input.value.trim();

  if(!rawText) return;

  const userText = rawText.toLowerCase();

  addMsg(rawText, "right");
  input.value = "";

  /* Screenshot trigger */
  if(userText.includes("screenshot") || userText.includes("screen")){
    verificationMode = true;
    verificationStep = 1;

    setTimeout(() => addMsg("Wait Verification", "left"), 500);

    setTimeout(() => {
      addMsg("20 sec.. Wait video ready", "left");
    }, 1200);

    return;
  }

  /* Verification loop */
  if(verificationMode){

    if(verificationStep === 1){
      verificationStep = 2;
      setTimeout(() => addMsg("Wait Verification", "left"), 600);
      return;
    }

    if(verificationStep === 2){
      verificationStep = 3;
      setTimeout(() => addMsg("20 sec.. Wait video ready", "left"), 600);
      return;
    }

    return;
  }

  /* Normal flow */
  if(step === 1){
    step = 2;

    setTimeout(() => {
      addMsg("मुझसे वीडियो चैट करने के लिए\n2 फाेटाे सेड हाेनी चाहिए तुरंत", "left");
    }, 600);

    return;
  }

  if(step === 2){
    step = 3;

    setTimeout(() => {
      addMsg("अभी विडियो काल करती हू", "left");
    }, 600);

    return;
  }

  /* After step 3 */
  setTimeout(() => {
    addMsg("स्क्रीनसॉट सेड करें", "left");
  }, 600);
}

/* CALL SYSTEM */
function incomingCall(){
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
      video:true,
      audio:false
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

  setTimeout(() => {
    addHTML(
      `और बात करने के लिए फ्री क्रेडिट प्राप्त करें<br>
       <a href="https://dirtypush.com" target="_blank">Free Credit Here</a>`,
      "left"
    );
  }, 500);
}