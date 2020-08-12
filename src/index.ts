import express, { Server } from 'express'

import {
  initEnvironmentVariables,
  initGraphql,
  initListener,
  initModels,
  initSchema,
  initRequestParser,
  initRoutes,
  initSession,
} from './init'

const app: Server = express()

Promise.resolve(app)
  .then(initEnvironmentVariables)
  .then(initRequestParser)
  .then(initSession)
  .then(initSchema)
  .then(initGraphql)
  .then(initRoutes)
  .then(initListener)
