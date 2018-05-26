import Ws from 'koa-route';

Ws.all('/socket/websocket', (ctx) => {
    this.websocket.send('Hello');
    this.websocket.on('message', (message) => {
    });
});

export default Ws;