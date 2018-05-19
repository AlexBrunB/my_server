export default class Auth {
    constructor(params, users) {
        this.params = params;
        this.users = users;
        console.log(this.users);
    }
    checkAuth() {
        if (!(this.params.email === this.users.email &&
            this.params.password === this.users.password))
            return (false);
        return (true);
    }
}