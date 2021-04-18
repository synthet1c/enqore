import express, { Server } from 'express'

import {
  initComponents,
  initEnvironmentVariables,
  initFields,
  initGraphQL,
  initListener,
  initModules,
  initRequestParser,
  initSchemas,
  initSession,
  initMongoDB,
  wipeMongoDBCollections,
  cleanupMongoDBConnection,
} from './init'
import { tapAsync, evalObject, trace } from './utils'

const app: Server = express()

Promise.resolve({ app })
  .then(tapAsync(initEnvironmentVariables))
  .then(tapAsync(initRequestParser))
  .then(tapAsync(initSession))
  .then(tapAsync(initMongoDB))
  .then(tapAsync(wipeMongoDBCollections))
  .then(tapAsync(initFields))
  .then(tapAsync(initComponents))
  // .then(tapAsync(initLayouts))
  .then(tapAsync(initSchemas))
  .then(tapAsync(initGraphQL))
  // .then(tapAsync(initRoutes))
  .then(tapAsync(initModules))
  .then(tapAsync(initListener))
  .then(tapAsync(cleanupMongoDBConnection))
