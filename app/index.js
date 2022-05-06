const fastify = require('fastify')({ logger: true })
const faker = require('faker');
require('dotenv').config()

fastify.get('/logs', async (request, reply) => {
  const levels = faker.random.arrayElements(['trace', 'debug', 'info', 'warn', 'error', 'fatal'], 6)
  let count = 0
  levels.forEach((level) => {
    const number = faker.datatype.number(10, 2)
    for (let i = 0; i < number; i++) {
      fastify.log[level](faker.lorem.sentence())
      count++
    }
  })
  return { logs_generated: count }
})

fastify.get('/', async (request, reply) => {
  return request.query.say || { message: `Hello, World! This NodeJS app ${process.env.APP_NAME} is running on port ${process.env.PORT}.`, ...request.headers }
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
