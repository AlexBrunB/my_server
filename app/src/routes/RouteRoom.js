import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteRoom extends Route {
    constructor(params) {
        super({ ...params});
    }

    // http://localhost:3000/rooms/
    @Route.Get({ path: '/rooms'})
    async room_g(ctx) {
        const rooms = await this.db.getRooms();
        this.sendOk(ctx, rooms);
    }

    // http://localhost:3000/rooms/:id/messages
    @Route.Get({ path: '/rooms/:id/messages'})
    messages(ctx) {
        this.sendOk(ctx, {
            msg: `Messages Room ${ctx.params.id}`
        });
    }

    // http://localhost:3000/rooms/
    @Route.Post({
        path: '/rooms',
        params: {
            name: true,
            topic: false,
        },
    })
    async room_p(ctx) {
        let room = await this.db.makeNewRoom(this.body(ctx));
        if (room)
            room = await this.db.getOneRoom(this.body(ctx).name);
        this.sendOk(ctx, room);
    }

    // http://localhost:3000/rooms/:id/join
    @Route.Post({ path: '/rooms/:id/join'})
    join(ctx) {
        this.sendOk(ctx, {
            msg: `Join Room ${ctx.params.id}`,
            id: ctx.params.id
        });
    }
}