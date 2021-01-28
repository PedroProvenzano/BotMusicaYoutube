require('dotenv/config');
const fetch = require('node-fetch');
let url = "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=";


class MessageHandler{
    constructor(client, io){
        this.io = io;
        this.client = client;
        this.usersOrder = [];
        this.isOpen = true;
    }
        
    async HandleDataBase(msg)
    {
        if(msg.order == "getTitle")
        {
        fetch(url + msg.url.slice(32,43) + "&key=" + process.env.APIKEY)
        .then(res => res.json())
        .then((res) => {
            let newMsg = {
                channel: msg.channel,
                title: res.items[0].snippet.title,
                url: msg.url
            }
            this.io.emit('TitleGot', newMsg);
        });
        }
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