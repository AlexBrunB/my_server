import Route from './Route';
import Auth from '../Auth';
import sha1 from 'sha1';

@Route.Route({
    routeBase: '',
})
export default class RoutSignIn extends Route {
    constructor(params) {
        super({ ...params});
    }

    // http://localhost:3000/signin/
    @Route.Post({
        path: '/signin',
        params: {
            email: true,
            password: false,
        },
    })
    async signin(ctx) {
        const body = this.body(ctx);
        const users = await this.db.getUser(body.email);
        const auth = new Auth(body, users.dataValues);
        if (auth.checkAuth() == true)
        {
            this.sendOk(ctx, {
                msg: "SignIn",
                id: users.id,
                email: users.email,
                password : users.password,
                bearer: sha1(`${users.password} + ${users.email} + ${Date.now()}`)
            });
        }
        else
        {
            this.sendUnauthorized(ctx, {
                access: "unauthorized"
            });
        }
    }
}