require('dotenv/config');
class MessageHandler{
    constructor(client, io){
        this.io = io;
        this.client = client;
        this.usersOrder = [];
        this.isOpen = true;
    }
        
    async HandleDataBase(msg)
    {

    }
    async Handle(message, channel, tags)
    {

    }
}

module.exports = MessageHandler;