import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteSignUp extends Route {
    constructor(params) {
        super({ ...params});
    }

    // http://localhost:3000/signup/
    @Route.Post({
         path: '/signup',
         params: {
             email: true,
             password: true,
             pseudo: true
         },
    })
    async signup(ctx) {
        const body = this.body(ctx);
        if (body.email && body.password && body.pseudo)
        {
            const res = await this.db.insertNewUser(body);
            if (res)
            {
                this.sendCreated(ctx, {
                    msg: `Welcome ${body.pseudo} ! You can chat now !`
                });
            } else {
                this.sendInternalServerError(ctx, {
                    msg: `Sorry, we have a error with the database`
                })
            }
        }
    }
}