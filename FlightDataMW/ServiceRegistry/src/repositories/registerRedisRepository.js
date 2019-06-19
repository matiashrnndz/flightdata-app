const RegisterRepository = require('./registerRepository');
import * as redis from 'redis';

module.exports = class RegisterRedisRepository extends RegisterRepository {

    constructor() {
        super();
        this.client = redis.createClient(6379, '127.0.0.1');
        this.client.on('connect', function() {
            console.log(`Connected to redis on : 127.0.0.1:6379`);
        });
    }

    async register(data) {
        let key = data.options.idClient;
        let value = JSON.stringify(data);
        this.client.set(key, value);
        return data;
    }

    async delete(key) {
        this.client.del(key, function(err, number) {
            if (err) {
                return new Error(err.message);
            }
            if (number >= 1) {
                return `Deleted ${key}.`;
            }
            return `There was no ${key} in database.`
        })
    }

    async discover() {
        this.client.get(discover-functions, function(err, reply) {
            if (err) {
                return new Error(err.message);
            }
            if (reply) {
                return reply;
            }
            return 'There is no discover functions available, try again.'
        });
    }

}
