/**
 * server.js — Startup file for cPanel "Setup Node.js App" (o2switch / Passenger).
 *
 * cPanel sets the PORT environment variable automatically.
 * `next start` is NOT used directly; we wrap the server so Passenger
 * can manage the process lifecycle cleanly.
 */
'use strict'

const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// Passenger / cPanel sets PORT; fallback to 3000 for local testing
const port = parseInt(process.env.PORT || '3000', 10)
const hostname = process.env.HOSTNAME || 'localhost'
const dev = process.env.NODE_ENV !== 'production'

const app = next({ dev, hostname, port, dir: __dirname })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      await handle(req, res, parse(req.url, true))
    } catch (err) {
      console.error('[server.js] Error:', req.url, err)
      res.statusCode = 500
      res.end('Internal server error')
    }
  }).listen(port, (err) => {
    if (err) throw err
    console.log(`> DokaiPi ready on port ${port} [${process.env.NODE_ENV || 'development'}]`)
  })
})
