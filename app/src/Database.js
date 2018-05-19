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
            password: { type: Sequelize.STRING }
        },{
            freezeTableName: true,
            timestamps: false,
        });
    }
    connect() {
        this.sequelize.authenticate()
        .then(() => {
            console.log('Connection has been established successfully');
            return (true);
        })
        .catch(err => {
            console.log('Unable to connect to the database', err);
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
                password: user.password
            }).then(() => {
                return resolve(true);
            }).catch(() => {
                return reject(false);
            });
        });
    }
}