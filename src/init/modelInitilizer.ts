import { Server } from 'express'
import path from 'path'
import { readJSON } from '../db'
import globby from 'globby'
import Extendable, { ExtendableConfig, Config } from '../models/Extendable'

export default function modelInitializer(
  initializerConfig: InitializerConfig
) {
  return async function (app: Server): Promise<Server> {
    const files: string[] = await globby(initializerConfig.files, {
      cwd: path.join(process.cwd(), './src'),
    })

    const models = await Promise.all(
      files.map(async (filename: string) => ({
        filename,
        file: await readJSON(filename)(),
      }))
    )

    const instances = models.map(({ filename, file }) =>
      initializerConfig.ctor.of({ ...file, filename })
    )

    if (typeof initializerConfig.after === 'function') {
      await initializerConfig.after(app, {
        files,
        models,
        instances
      })
    }

    return app
  }
}

export interface InitializerConfig {
  files: string[]
  ctor: IInitializer
  after?: (app: Server, args: AfterArgs) => void
}

export interface AfterArgs {
  files: string[]
  models: FileConfig[]
  instances: Extendable[]
}

export interface FileConfig {
  filename: string,
  file: Config
}


export interface IInitializer {
  of(_config: ExtendableConfig): Extendable
}
