import Route from './Route';

@Route.Route({
    routeBase: '',
})
export default class RouteUsers extends Route {
    constructor(params) {
        super({ ...params});
    }

    async getUserRoomsWithId(id) {
        const rooms = [];
        const user_rooms = await this.db.getUserRooms(id);
      
        for (let room of user_rooms) {
          const contents = await this.db.getOneRoom(room);
          rooms.push(contents);
        }
        return (rooms);
    }

    // http://localhost:3000/users/:id/rooms
    @Route.Get({ path: '/users/:id/rooms'})
    async room(ctx) {
        const rooms = await this.getUserRoomsWithId(ctx.params.id);
        this.sendOk(ctx, rooms);
    }
}