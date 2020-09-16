//DOM Query
const chatList = document.querySelector('.chat-list');
const newChatForm = document.querySelector('.new-chat')
const newNameForm = document.querySelector('.new-name');
const updateMssg = document.querySelector('.update-mssg');
const updateRoom = document.querySelector('.chat-rooms');

const username = localStorage.username ? JSON.parse(localStorage.username) : 'anon'

// class instances
const chatUI = new ChatUI(chatList);
let chatroom = new Chatroom('general', username);

// if(localStorage.getItem('username')){
//     const username = JSON.parse(localStorage.getItem('username'));
//     chatroom = new Chatroom('general', username);
// }


//get chats and render(rendering is in the UI class)
chatroom.getChats((data) => chatUI.render(data));

//add a new chat
newChatForm.addEventListener('submit', e => {
    e.preventDefault();
    chatroom.addChat(newChatForm.message.value.trim())
        .then(newChatForm.reset())
        .catch(err => console.log(err));
});





// //update username
newNameForm.addEventListener('submit', e => {
    e.preventDefault();
    const newName = newNameForm.name.value.trim(); 
    chatroom.username = newName;
    const newNameJSON = JSON.stringify(newName);
    localStorage.setItem('username', newNameJSON);
    newNameForm.reset();
    
    updateMssg.innerText = `Your name has been updated to ${newName}`;
    setTimeout(() => {
        updateMssg.innerText = '';
    }, 3000);
});


/// updating the room
updateRoom.addEventListener('click', e => {
    //console.log(e.target.getAttribute('id')); 
    if(e.target.tagName === 'BUTTON'){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute('id'));
        chatroom.getChats(chat => {
            chatUI.render(chat);
        });
    }
});