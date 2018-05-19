import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteUsers extends Route {
    constructor(params) {
        super({ ...params});
    }

    // http://localhost:3000/users/:id/rooms
    @Route.Get({ path: '/users/:id/rooms'})
    room(ctx) {
        this.sendOk(ctx, {
            msg: `Room Users ${ctx.params.id}`
        });
    }
}