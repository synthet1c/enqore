import { Config } from './Extendable'

const _cache: Map<string, File> = new Map()

export default class File {
  protected _filename: string
  constructor(_config: Config) {
    this._filename = _config.filename
    _cache.set(_config.filename, this)
  }

  static getByName(name: string): File {
    return _cache.get(name)
  }

  static entries(): IterableIterator<[string, File]> {
    return _cache.entries()
  }
}
