import { Server } from "express"
import bodyParser from 'body-parser'

export default async function initRequestParser(app: Server) {

  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(bodyParser.json())

  return app
}