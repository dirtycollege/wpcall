const chat = document.getElementById("chat");
const imgInput = document.getElementById("img");
const ringtone = document.getElementById("ringtone");
const selfCam = document.getElementById("selfCam");
const bgVideo = document.getElementById("bgVideo");

let step = 0;
let verificationMode = false;
let verificationStep = 0;
let localStream = null;

/* ---------------- RANDOM USER ---------------- */

const keys = Object.keys(USERS);
const randomKey = keys[Math.floor(Math.random() * keys.length)];
const currentUser = USERS[randomKey];

/* Header bind */
document.getElementById("dp").src = currentUser.dp;
document.getElementById("name").innerText = currentUser.name;

/* Call screen bind */
document.getElementById("callDp").src = currentUser.dp;
document.getElementById("callName").innerText = currentUser.name;

/* Background video bind (SAFE) */
bgVideo.src = currentUser.video;
bgVideo.load();

/* Try autoplay safely */
bgVideo.play().catch(() => {
  console.log("Autoplay prevented (normal on mobile)");
});

/* ---------------- HELPERS ---------------- */

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

/* ---------------- INITIAL MESSAGE ---------------- */

setTimeout(() => {
  addMsg("Hiii 😎 क्या आप मुझसे वीडियो कॉल पर बात करना चाहते हैं?", "left");
  step = 1;
}, 600);

/* ---------------- IMAGE BUTTON ---------------- */

function openImg(){
  imgInput.click();
}

/* ---------------- IMAGE SEND ---------------- */

imgInput.onchange = function(){
  if(this.files && this.files[0]){
    const fileURL = URL.createObjectURL(this.files[0]);

    addImg(fileURL, "right");
    addMsg("Wait Verification...", "left");

    setTimeout(incomingCall, 1000);
  }
};

/* ---------------- SEND TEXT ---------------- */

function sendMsg(){
  const input = document.getElementById("msg");
  const rawText = input.value.trim();

  if(!rawText) return;

  const userText = rawText.toLowerCase();

  addMsg(rawText, "right");
  input.value = "";

  if(userText.includes("screenshot") || userText.includes("screen")){
    verificationMode = true;
    verificationStep = 1;

    setTimeout(() => addMsg("Wait Verification", "left"), 500);
    setTimeout(() => addMsg("20 sec.. Wait video ready", "left"), 1200);
    return;
  }

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

  if(step === 1){
    step = 2;

    setTimeout(() => {
      addMsg("अगर आप सेक्स वीडियो चैट करना चाहते हैं तो आपको ₹49 रुपये का पेमेंट स्क्रीनशॉट भेजे स्क्रीनशॉट भेजते ही जॉच करके वीडियो कॉल किया जाएगा 100% 👍👍👍", "left");
      addImg("assets/verify1.jpeg", "left");
      addImg("assets/verify2.jpeg", "left");
    }, 600);

    return;
  }

  if(step === 2){
    step = 3;

    setTimeout(() => {
      addMsg("👉👉👉 ₹49 रुपये का पेमेंट स्क्रीनशॉट भेजे वीडियो कॉल रेडी है| मै अभी वीडियो कॉल करती हू जल्दी करे", "left");
      addImg("assets/verifypay1.jpeg", "left");
      addImg("assets/verifypay2.jpeg", "left");
    }, 600);

    return;
  }

  if(step === 3){
    setTimeout(() => addMsg("स्क्रीनशॉट भेजे जल्दी वीडियो कॉल रेडी है", "left"), 600);
  }
}

/* ---------------- CALL SYSTEM ---------------- */

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

  startVideo();
  startCamera();
}

/* ---------------- VIDEO SAFETY ---------------- */

function startVideo(){
  bgVideo.currentTime = 0;

  bgVideo.play().catch(err => {
    console.log("User interaction required:", err);
  });
}

/* ---------------- CAMERA ---------------- */

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
      `और बात करने के लिए 👇👇👇 फ्री क्रेडिट प्राप्त करें<br>
       <a href="https://swogex.com/?from=wpcall" target="_blank">Free Credit Here</a>`,
      "left"
    );
  }, 500);
}