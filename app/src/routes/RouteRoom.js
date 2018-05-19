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
    room_g(ctx) {
        this.sendOk(ctx, {
            msg: 'Get rooms'
        });
    }

    // http://localhost:3000/rooms/:id/messages
    @Route.Get({ path: '/rooms/:id/messages'})
    messages(ctx) {
        this.sendOk(ctx, {
            msg: `Messages Room ${ctx.params.id}`
        });
    }

    // http://localhost:3000/rooms/
    @Route.Post({ path: '/rooms'})
    room_p(ctx) {
        this.sendOk(ctx, {
            msg: 'Post rooms'
        });
    }

    // http://localhost:3000/rooms/:id/join
    @Route.Post({ path: '/rooms/:id/join'})
    join(ctx) {
        this.sendOk(ctx, {
            msg: `Join Room ${ctx.params.id}`
        });
    }
}