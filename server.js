const server = require('express')();
const http = require('http').createServer(server);
const io = require('socket.io')(http);

//corre esto cuando alguien se conecta


io.on('connection', function(socket){
    console.log('A user connected: ' + socket.id);

    socket.on('send', function(text){
       
        let newText = "<" + socket.id + "> " + text;
        

        if (text === 'struct card') {
            io.emit('struct create',130,180);    
        };

        if (text === 'struct token') {
            console.log('struct token fue dicho');
            io.emit('struct create',100,100);    
        };

        io.emit('receive',newText);
    })

    socket.on('disconnect', function () {
        console.log('A user disconnected: '+ socket.id);
        
    })

    socket.on('prueba', function (text) {
        console.log('prueba: '+ text);
        
    })
})

http.listen(3000,function () {
    console.log('Server iniciado!');
})
