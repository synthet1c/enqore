import express from 'express'

import initializeModels from "./initialize/models";
import initializeGraphql from './initialize/graphql'
import initializeRoutes from "./initialize/routes";
import initializeListener from './initialize/listener';

const app = express()

Promise.resolve(app)
  .then(initializeModels)
  .then(initializeGraphql)
  .then(initializeRoutes)
  .then(initializeListener)
