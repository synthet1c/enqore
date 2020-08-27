import modelInitializer, { AppInitializer } from './modelInitilizer'
import Module, { ModuleConfig } from '../models/Module'
import { Server, Request, Response } from 'express'
import globby from 'globby'
import path from 'path'
import readFile from '../utils/readFile'
import { GraphQLSchema } from 'graphql'
// import { readJSON } from '../db'

export default async function initializeModules({
  app,
  schema,
}: AppInitializer): Promise<AppInitializer> {
  const files: string[] = await globby('**/*/*.module.json', {
    cwd: path.join(process.cwd(), './src'),
  })

  console.log('files', files)

  const modules = await Promise.all(files.map(readFile))

  const _modules = modules.map((module: any) => new Module(module))

  _modules.forEach((module) => module.init(app, schema))

  console.log(_modules)

  return {
    app,
    schema,
    modules: _modules,
  }
}
