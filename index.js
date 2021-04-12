const chatHandler = require("./modules/Chat");
const ticketHandler = require("./modules/ticket");

require("./connect-mongodb");
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*',
    }
});



io.on('connection', socket => {
    console.log('new connect...');
    //run when client disconnects
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chart')
    })

    //listen change
    socket.on('updateListMessage', async (chatId, newMessage) => {
        const newListMessage = await chatHandler.updateListMessage(chatId, newMessage);
        console.log(newListMessage)
        io.emit('listChat', newListMessage)
    })

    //get list chart
    socket.on('getListChat' , async (chatId) => {
        const listChat = await chatHandler.getListChat(chatId);
        return io.emit('listChat', listChat);
    })

    socket.on('activeUser', (aliasName) => {
        arrActiveUser.push(aliasName)
    })

    socket.on('scanTicket', async (data) => {
        const guestData = await ticketHandler.ScanTicketReal(data);
        const result = await ticketHandler.getTicketUser(data);
        socket.emit('scanTicket', guestData)
        io.emit('userJoin', result)
    })

    socket.on('userJoin', async (eventId) => {
        const result = await ticketHandler.getTicketUser(eventId);
        io.emit('userJoin', result)
    })
})

http.listen(5000, function () {
    console.log('listening on port 5000')
})