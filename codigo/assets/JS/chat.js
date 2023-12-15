
// sendImage.addEventListener("click", () => renderUserMessage()); //



 /* txtInput.addEventListener("keyup", (event) => {
        if (event.key === 'Enter') {
                renderUserMessage();
        }
}); */
const chatHeader = document.querySelector(".chat-header")
const container = document.getElementById("Neymar")
function handleKeyPress(event) {
        if (event.key === 'Enter') {
        renderUserMessage();
        }
    }

    chatHeader.addEventListener("click", () => {
        container.classList.toggle("colapsar");
    });
    
const renderUserMessage = () => {
        
        const txtInput = document.getElementById('txtInput');
       

        const Userinput = txtInput.value;
        renderMessageElement(Userinput, "user")
        txtInput.value = "";
        setTimeout(()=>{
                renderChatBotResponse(Userinput);
        },600 );



};

const renderChatBotResponse = (Userinput) => {
        const res = getChatBotResponse(Userinput)
        renderMessageElement(res);
};

const renderMessageElement = (txt, type) => {
        let className = "user-message";
        if(type!== 'user'){
        className="chatbot-message";
}
        const chatBody = document.getElementById('chat-body');
        const messageElement = document.createElement('div')
        const txtnode = document.createTextNode(txt)
        messageElement.classList.add(className);
        messageElement.appendChild(txtnode)
        chatBody.appendChild(messageElement)

}
const getChatBotResponse = (Userinput) => {
        return responseObj[Userinput] == undefined ? "Por favor tente novamente" : responseObj[Userinput]
}

const Minimize = () => {

const elementoParaEsconder = document.getElementById('Neymar');


elementoParaEsconder.style.display = 'none';
}

