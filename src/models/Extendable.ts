import { mergeAll } from 'rambda'
import File from './File'

export default abstract class Extendable extends File {
  protected __defaultConfig: ExtendableConfig
  protected _config: ExtendableConfig

  protected constructor(_config: ExtendableConfig) {
    super(_config)
    this.__defaultConfig = _config
    this._config = _config
    if (typeof _config.extends === 'string') {
      this._config = this.extendConfig()
    }
  }

  public getConfig(): ExtendableConfig {
    return this._config
  }

  public extendConfig(): ExtendableConfig {
    return mergeAll(this.getExtensionsArray())
  }

  /**
   * get the objects to be extended ordered oldest to newest
   */
  private getExtensionsArray() {
    let extendable = this
    const extensions = [this.getConfig()]
    // @ts-ignore
    while ((extendable = extendable.getExtensionObject())) {
      console.log('extendable', extendable, extensions)
      if (extendable) {
        extensions.unshift(extendable.getConfig())
      }
    }
    return extensions
  }
}

export interface Config {
  name: string
  filename: string,
  key: string
  description?: string
}

export interface ExtendableConfig extends Config {
  extends: string | Extends | false
}

export interface Extends {
  file: string
  merge: ExtendsMerge | MergeType
}

export interface ExtendsMerge {
  meta?: MergeType
  components?: MergeType
  fields?: MergeType
  permissions?: MergeType
  blocks?: MergeType
  data?: MergeType
}

export type MergeType =
  | 'merge'
  | 'overwrite'
  | 'mergeLeft'
  | 'mergeRight'
  | 'mergeDeep'
