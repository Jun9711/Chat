"use strict"
const socket = io();

const nickname = document.querySelector("#nickname");
const chatlist = document.querySelector(".chatList");
const chatInput = document.querySelector(".chatInput");
const sendBtn = document.querySelector(".sendBtn");
const displayContainer = document.querySelector(".d-con")

chatInput.addEventListener("keypress", (event)=>{
    if(event.keyCode == 13){
        send()
    }
})
function send() {
    const param = {
        name: nickname.value,
        msg: chatInput.value
    }
    
    socket.emit("chatting", param)
    chatInput.value = "";
}
sendBtn.addEventListener("click", send)

socket.on("chatting", (data) => {
    const {name, msg, time} = data;
    const item = new LiModel(name, msg, time);
    item.makeLi()
    displayContainer.scrollTo(0, displayContainer.scrollHeight)
})

function LiModel(name, msg, time){
    this.name = name;
    this.msg = msg;
    this.time = time;

    this.makeLi = ()=>{
        const li = document.createElement("li");
        li.classList.add(nickname.value == this.name ? "sent": "rec")
        const dom = 
            '<div class="profile">' +
                '<img src="img/ME_1.jpg" alt="any" class="img">' +
            '</div>' +
            '<div class="messege">' +
                '<span class="user">' + this.name + '</span>' +
                '<div class="chat">' +
                    '<span class="msg">' + this.msg + '</span>' +
                    '<span class="time">' + this.time + '</span>'+
                '</div>' +
            '</div>';
            li.innerHTML = dom;
            chatlist.appendChild(li)
    }

}