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
        let command = message.slice(0, 3);
        let link = message.slice(4);
        if(command == "-sr")
        {
            let msg = {
                url: link,
                channel:  channel
            }
            this.io.emit('newVideo', msg);
            console.log('emmited new video to client ' + msg.channel);
        }
    }
}

module.exports = MessageHandler;