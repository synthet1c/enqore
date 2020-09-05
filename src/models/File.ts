import { parse, join, ParsedPath, resolve } from 'path'
import { existsSync, promises as fsPromise } from 'fs'
import Base from './Base'


export default class File extends Base {
  public file: ParsedPath

  constructor(config: FileConfig) {
    super(config)
    this.file = parse(config.file)
  }

  protected async readFile(filename: string): Promise<Buffer> {
    return loadFile(filename)(true)
      .catch(loadFile(process.cwd(), './src', filename))
      .catch(loadFile(this.file?.dir, filename))
      // @ts-ignore
      .catch(loadFile(this.parent?.file?.dir, filename))
  }

  protected async readJSONFile(filename: string): Promise<object> {
    return await this.readFile(filename).then((file: Buffer) =>
      JSON.parse(file.toString())
    )
  }

  protected async readTextFile(filename: string): Promise<string> {
    return await this.readFile(filename).then((file: Buffer) => file.toString())
  }
}

export interface FileConfig {
  file: string
}

const loadFile = (...paths: any[]) => async (x: any): Promise<any> => {
  if (paths.some(p => p == null)) {
    throw new Error(`path param is undefined`)
  }
  return fsPromise.access(join(...paths))
    .then(x => fsPromise.readFile(resolve(...paths)))
}
