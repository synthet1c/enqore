// @ts-ignore
import session from 'express-session'
import { Server } from 'express'
import { AppInitializer } from './modelInitilizer'

export default async function initSession({ app }: AppInitializer) {

  app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: 'Who\'s the baddest of them all?',
  }))
}