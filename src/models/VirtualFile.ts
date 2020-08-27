import { Config } from './Extendable'

const _cache: Map<string, VirtualFile> = new Map()

export default class VirtualFile {
  protected _filename: string
  constructor(_config: Config) {
    this._filename = _config.filename
    _cache.set(_config.filename, this)
  }

  static getByName(name: string): VirtualFile {
    return _cache.get(name)
  }

  static entries(): IterableIterator<[string, VirtualFile]> {
    return _cache.entries()
  }
}
