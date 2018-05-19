import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteAdmin extends Route {
    constructor(params) {
        super({ ...params});
    }

    // http://localhost:3000/admin/
    @Route.Get({ path: '/admin'})
    admin(ctx) {
        this.sendOk(ctx, {
            msg: "Admin Zone"
        });
    }
}