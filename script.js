const chat = document.getElementById("chat");

let step = 0;
let verificationStarted = false;
let callActive = false;

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
  d.innerHTML = `<img src="${src}" class="chat-img">`;
  chat.appendChild(d);
  chat.scrollTop = chat.scrollHeight;
}

/* STEP 1 – initial SMS */
setTimeout(() => {
  addMsg("Hiii 😊 क्या वीडियो चैट करना चाहते हैं", "left");
  step = 1;
}, 600);

/* send text */
function sendMsg(){
  const m = document.getElementById("msg");
  if(!m.value.trim()) return;

  const userText = m.value.toLowerCase();

  addMsg(m.value, "right");
  m.value = "";

  /* Screenshot detection */
  if(userText.includes("screenshot") || userText.includes("screen")){
    if(!verificationStarted){
      verificationStarted = true;

      setTimeout(() => addMsg("Wait Verification...", "left"), 500);
      setTimeout(() => addMsg("20 sec... Wait video ready", "left"), 20000);
      setTimeout(() => incomingCall(), 22000);
    }
    return;
  }

  /* STEP FLOW */

  if(step === 1){
    step = 2;

    setTimeout(() => {
      addMsg("मुझसे वीडियो चैट करने के लिए bolo\n2 फोटो send होनी चाहिए तुरंत", "left");

      /* images */
      addImg("assets/img1.jpeg", "left");
      addImg("assets/img2.jpeg", "left");

    }, 500);

    return;
  }

  if(step === 2){
    step = 3;

    setTimeout(() => {
      addMsg("जल्दी करें 🙂 वीडियो कॉल रेडी है\n2 फोटो send भी हो", "left");

      /* images साथ में */
      addImg("assets/img1.jpeg", "left");
      addImg("assets/img2.jpeg", "left");

    }, 500);

    return;
  }

  /* Repeat response until call */
  if(!callActive){
    setTimeout(() => {
      addMsg("वीडियो कॉल रेडी है\n2 फोटो send भी हो", "left");
    }, 400);
  }
}

/* CALL SYSTEM */
function incomingCall(){
  callActive = true;
  document.getElementById("call").style.display = "flex";
}

function acceptCall(){
  document.getElementById("call").style.display = "none";
  document.getElementById("videoBox").style.display = "block";
}

function endCall(){
  document.getElementById("videoBox").style.display = "none";
  addMsg("📞 Call ended", "left");

  /* Redirect after call */
  window.location.href = "https://example.com";
}