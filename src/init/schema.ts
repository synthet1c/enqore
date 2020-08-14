import { Server } from 'express'
import path from 'path'
import { readJSON } from '../db'
import Schema from '../models/Schema'
import _glob from 'glob'
import util from 'util'
import { ModelJSON } from '../models/Model'
const glob = util.promisify(_glob)

export default async function initModels(app: Server) {
  const files: string[] = await glob('**/*/*.schema.json', {
    cwd: path.join(process.cwd(), './src'),
  })

  const configs = await Promise.all(files.map((file) => readJSON(file)()))

  configs.forEach((config: ModelJSON) => new Schema(config))

  return app
}
