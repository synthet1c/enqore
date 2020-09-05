import modelInitializer, { AppInitializer } from './modelInitilizer'
import Module, { ModuleConfig } from '../models/Module'
import { Server, Request, Response } from 'express'
import globby from 'globby'
import path from 'path'
import readFile from '../utils/readFile'
import { GraphQLSchema } from 'graphql'
import { tap } from 'rambda'
// import { readJSON } from '../db'

export default async function initializeModules({
  app,
  Db,
  schema,
}: AppInitializer): Promise<AppInitializer> {
  const files: string[] = await globby('**/*/*.module.json', {
    cwd: path.join(process.cwd(), './src'),
  })

  const modules = await Promise.all(files.map(readFile))

  const _modules = modules.map((module: any) => new Module(module))

  // initialize all the modules
  return Promise.all(_modules.map((module) => module.init(app, schema, Db)))
    .then(tap((responses: any) => {
      console.log(_modules)
    }))
    .then((x: any) => ({
      app,
      schema,
      modules: _modules,
    }))


}
