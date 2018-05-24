import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteRoom extends Route {
    constructor(params) {
        super({ ...params});
    }

    isInsideRoom(rooms, room_id) {
        let res = false;
        rooms.forEach(room => {
            if (room == room_id)
            {
                res = true;
                return (true);
            }
        });
        return (res);
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
    @Route.Post({
        path: '/rooms/:id/join',
        params: {
            user_id: true
        }
    })
    async join(ctx) {
        let list = [];
        const body = this.body(ctx);
        let rooms = await this.db.getUserRooms(body.user_id);
        rooms.push(parseInt(ctx.params.id));
        const res = await this.db.joinUserRoom(body.user_id, rooms);
        if (res)
        {
            const users = await this.db.getAllUsers();
            users.forEach(user => {
                const rooms = JSON.parse(user.room);
                if (this.isInsideRoom(rooms, ctx.params.id))
                    list.push(user);
            });
        }
        console.log(list);
        this.sendOk(ctx, {
            name: (await this.db.getOneRoom(ctx.params.id)).name
        }, list);
    }
}