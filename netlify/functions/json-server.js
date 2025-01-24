const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router('./api/db.json')
const middlewares = jsonServer.defaults()

exports.handler = async (event, context) => {
  server.use(middlewares)
  server.use(router)

  return new Promise((resolve, reject) => {
    server.handle(event, {}, (err, res) => {
      if (err) {
        reject({
          statusCode: 500,
          body: JSON.stringify({ error: 'Server error' }),
        })
      } else {
        resolve({
          statusCode: res.statusCode || 200,
          body: res.body,
          headers: res.headers || { 'Content-Type': 'application/json' },
        })
      }
    })
  })
}
