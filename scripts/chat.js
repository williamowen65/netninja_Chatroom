//adding new chat documents
//setting up a real-time listener to get new chats
//updating the username
//updating the room

//manages the chatroom data
class Chatroom{
    constructor(room, username){
        this.room = room;
        this.username = username;
        this.chats = db.collection('chats');
        this.unsub;
    }
    async addChat(message){
        //format a chat object
        const now = new Date();
        const chat = {
            message,
            username: this.username,
            room: this.room,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        //save the chat document
        const response = await this.chats.add(chat);
        return response;
    }
    getChats(callback){
      this.unsub = this.chats
        .where('room', '==', this.room)
        .orderBy('created_at')    //((((forthis to work, initalize index on firebase))))
        .onSnapshot(snapshot => {
          snapshot.docChanges().forEach(change => {
              
              if(change.type === 'added'/*&& change.doc.data().room === this.room*/){
                    //update ui
                    callback(change.doc.data())
              } 
          })
        })
    }
    //ultimatly we will store their username in local storage
    updateName(username){
        this.username = username;
    }
    //when we update a room, we need to unsub() from the current room and run getChats() for the new room
    updateRoom(room){
        this.room = room;
        console.log('room updated');
        if(this.unsub){
            this.unsub();
            // chatroom.getChats((data) => {
            //     console.log(data);
            // }); this works
        };
       

    }
}






