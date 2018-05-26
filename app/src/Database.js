const Sequelize = require('sequelize');

export default class Database {
    constructor(database, username, password, host) {
        this.sequelize = new Sequelize(database, username, password, {
            host: host,
            dialect: 'mysql',
            operatorsAliases: false,
        
            pool: {
                max: 4,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        });
        this.user = this.sequelize.define('account', {
            id: { type: Sequelize.INTEGER, primaryKey: true},
            pseudo: { type: Sequelize.STRING },
            email: { type: Sequelize.STRING },
            password: { type: Sequelize.STRING },
            room: { type: Sequelize.STRING },
        },{
            freezeTableName: true,
            timestamps: false,
        });
        this.rooms = this.sequelize.define('rooms', {
            id: { type: Sequelize.INTEGER, primaryKey: true},
            name: { type: Sequelize.STRING },
            topic: { type: Sequelize.STRING }
        },{
            freezeTableName: true,
            timestamps: false,
        });
    }
    connect() {
        this.sequelize.authenticate()
        .then(() => {
            return (true);
        })
        .catch(err => {
            return (false);
        });
    }
    async getUser(email) {
        return new Promise((resolve, reject) => {
            this.user.findOne({
                where: {email: email},
            }).then(user => {
                return resolve(user);
            }).catch(err => {
                return reject(err);
            })
        });
    }
    async insertNewUser(user) {
        return new Promise((resolve, reject) => {
            this.user.create({
                pseudo: user.pseudo,
                email: user.email,
                password: user.password,
		room: '[]'
            }).then(() => {
                return resolve(true);
            }).catch(err => {
		console.log(err);
                return reject(false);
            });
        });
    }
    async getOneRoom(id) {
        return new Promise((resolve, reject) => {
            this.rooms.findOne({
                where: {id: id},
            }).then(room => {
                return resolve(room);
            }).catch(err => {
                return reject(err);
            })
        });
    }    
    async getRooms() {
        return new Promise((resolve, reject) => {
            this.rooms.findAll()
            .then(rooms => {
                return resolve(rooms);
            }).catch(err => {
                return reject(err);
            })
        });
    }
    async makeNewRoom(room) {
        return new Promise((resolve, reject) => {
            this.rooms.create({
                name: room.name,
                topic: room.topic
            }).then(() => {
                return resolve(true);
            }).catch(() => {
                return reject(false);
            });
        })
    }
    async getUserRooms(user) {
        return new Promise((resolve, reject) => {
            this.user.findOne({
                where: {id: user}
            }).then(rooms => {
                if (rooms == null)
                    return reject(rooms);
                rooms = JSON.parse(rooms.dataValues.room);
                return resolve(rooms);
            }).catch(err => {
                return reject(err);
            });
        })
    }
    async joinUserRoom(user_id, rooms) {
        return new Promise((resolve, reject) => {
            this.user.update({
                room: JSON.stringify(rooms)
            },{
                where: {id: user_id}
            }).then(() => {
                return resolve(true);
            }).catch(() => {
                return reject(false);
            });
        })
    }
    async getAllUsers() {
        return new Promise((resolve, reject) => {
            this.user.findAll()
            .then((users) => {
                return resolve(users);
            }).catch(err => {
                return reject(err);
            });
        });
    }
}
