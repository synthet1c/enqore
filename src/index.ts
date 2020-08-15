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

const tapAsync = (fn: (x: Server) => Promise<any>) => (
  x: Server
): Promise<Server> => fn(x).then(() => x)

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
  .then(
    tapAsync(async (x: Server) => {
      // console.log(File.entries())
      return await Promise.resolve(true)
    })
  )
  .then(initListener)
