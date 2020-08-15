import express, { Server } from 'express'
import File from './models/File'

import {
  initEnvironmentVariables,
  initGraphQL,
  initListener,
  initSchemas,
  initRequestParser,
  initRoutes,
  initModules,
  initComponents,
  initSession,
  initFields,
  initLayouts,
} from './init'

const app: Server = express()

Promise.resolve(app)
  .then(initEnvironmentVariables)
  .then(initRequestParser)
  .then(initSession)
  .then(initFields)
  .then(initComponents)
  .then(initLayouts)
  .then(initSchemas)
  .then(initGraphQL)
  .then(initRoutes)
  .then(initModules)
  .then(x => {{
    // console.log(File.entries())
    return x
  }})
  .then(initListener)
