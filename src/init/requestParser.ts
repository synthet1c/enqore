import { Server } from "express"
import bodyParser from 'body-parser'
import { AppInitializer } from './modelInitilizer'

export default async function initRequestParser({ app }: AppInitializer) {

  app.use(bodyParser.urlencoded({ extended: false }))

  app.use(bodyParser.json())
}