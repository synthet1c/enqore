import modelInitializer from './modelInitilizer'
import Module from '../models/Module'
import { Server, Request, Response } from 'express'

export default modelInitializer({
  files: ['**/*/*.module.json'],
  ctor: Module,
  after(app: Server, { instances }) {
    instances.forEach((module: Module) => {
      module.initExpressRoutes(app)
    })
  },
})
