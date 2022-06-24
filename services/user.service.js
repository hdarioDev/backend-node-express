// const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres')
const pool = require('../libs/postgres.pool')
class UserService {
  constructor() {
    this.pool = pool
    this.pool.on('error', (err) => console.error(err))
  }


  async find() {
    // const client = await getConnection()
    // const rta = await client.query('SELECT * FROM tasks')
    const query = 'SELECT * FROM tasks'
    const rta = await this.pool.query(query)
    return rta.rows;
  }

  async create(data) {
    return data;
  }


  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
