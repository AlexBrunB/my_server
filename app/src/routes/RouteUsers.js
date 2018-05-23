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
        this.sendOk(ctx, [{
            id: 3,
            name: 'user_room',
            date: '2018-01-10',           
            msg: `Room Users ${ctx.params.id}`
        }]);
    }
}