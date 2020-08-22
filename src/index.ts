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
): Promise<Server> => fn(x).then((_: any) => x)

Promise.resolve(app)
  .then(tapAsync(initEnvironmentVariables))
  .then(tapAsync(initRequestParser))
  .then(tapAsync(initSession))
  .then(tapAsync(initFields))
  .then(tapAsync(initComponents))
  .then(tapAsync(initLayouts))
  .then(tapAsync(initSchemas))
  .then(tapAsync(initGraphQL))
  .then(tapAsync(initRoutes))
  .then(tapAsync(initModules))
  .then(
    tapAsync(async (x: Server) => {
      // console.log(File.entries())
      return await Promise.resolve(true)
    })
  )
  .then(tapAsync(initListener))
