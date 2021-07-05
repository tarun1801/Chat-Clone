const socket  =  io();

let name ;
const textarea = document.querySelector("#textarea")
const messageArea = document.querySelector('.message__area');
do{
    name = prompt("Please enter your name");

}while(!name)

textarea.addEventListener("keyup",e=>{
    if(e.key == "Enter")
    {
        sendMessage(e.target.value);

    }
})
function sendMessage(message){

    //Append
    let msg = {
        user :name,
        message : message.trim()
    }
    appendMessage(msg,"outgoing");
    scrollToBottom();

    // Send to the server.
    socket.emit("message",msg);

    textarea.value = "";
}

function appendMessage(msg, type)
{
    let maindiv = document.createElement('div')
    let className = type;
    maindiv.classList.add(className,"message");

    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    maindiv.innerHTML = markUp;
    messageArea.appendChild(maindiv);
}

function scrollToBottom(){
    messageArea.scrollTop = messageArea.scrollHeight;
}

socket.on("message",(msg)=>{
    appendMessage(msg,"incoming");
    scrollToBottom()
})