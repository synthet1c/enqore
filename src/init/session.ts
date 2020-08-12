// @ts-ignore
import session from 'express-session'
import { Server } from 'express'

export default async function initSession(app: Server) {

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Who\'s the baddest of them all?',
  }))

  return app
}