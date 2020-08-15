import modelInitializer from './modelInitilizer'
import Module from '../models/Module'
import { Server, Request, Response } from 'express'

export default modelInitializer({
  files: ['**/*/module.json'],
  ctor: Module,
  after(app: Server, { instances }) {
    instances.forEach((instance: Module) => {
      instance.getRoutes().forEach((route: any, i: number) => {
        app.use(route.expressUrl, (req: Request, res: Response) => {
          res.json({
            route,
            params: req.params,
          })
        })
      })
    })
  },
})
