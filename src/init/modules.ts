import modelInitializer, { AppInitializer } from './modelInitilizer'
import Module, { ModuleConfig } from '../models/Module'
import globby from 'globby'
import path from 'path'
import readFile from '../utils/readFile'

export default async function initializeModules(
  initializer: AppInitializer
): Promise<AppInitializer> {
  const { app, Db, schema } = initializer

  const files: string[] = await globby('**/*/*.module.json', {
    cwd: path.join(process.cwd(), './src'),
  })

  const modules = await Promise.all(files.map(readFile))

  const _modules = modules.map((module: any) => new Module(module))

  // initialize all the modules
  await Promise.all(
    _modules.map((module) => module.init(app, schema, Db))
  )

  return {
    ...initializer,
    modules: _modules,
  }
}
