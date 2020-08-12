import { Server } from "express";
import path from "path";
import { readJSON } from "../db";
import Model from "../models/Model";
import _glob from 'glob'
import util from 'util'
const glob = util.promisify(_glob)

export default async function initModels(app: Server) {

  const files: string[] = await glob('**/*/model.json', {
    cwd: path.join(process.cwd(), './src')
  })

  const configs = await Promise.all(files.map(file => readJSON(file)()))

  // @ts-ignore
  const models: Model[] = configs.map(config => new Model(config))

  return app
}