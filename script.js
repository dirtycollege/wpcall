const chat = document.getElementById("chat");
const imgInput = document.getElementById("img");

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

/* INITIAL MESSAGE */
setTimeout(() => {
  addMsg("Hiii 😊 क्या वीडियो चैट करना चाहते हैं", "left");
  step = 1;
}, 600);

/* IMAGE BUTTON */
function openImg(){
  imgInput.click();
}

/* IMAGE SELECT + VERIFICATION FLOW */
imgInput.onchange = function(){
  if(this.files && this.files[0]){

    const fileURL = URL.createObjectURL(this.files[0]);
    addImg(fileURL, "right");

    if(!verificationStarted){
      verificationStarted = true;

      setTimeout(() => {
        addMsg("Wait Verification...", "left");
      }, 300);

      /* 10 sec बाद कॉल */
      setTimeout(() => {
        incomingCall();
      }, 10000);
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
      addMsg("जल्दी करें 🙂 वीडियो कॉल रेडी है\n2 फोटो send भी हो", "left");
    }, 400);

    return;
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
}