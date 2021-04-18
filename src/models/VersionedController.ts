import { cachedDataVersionTag } from 'v8'

interface isVersioned {
  getters: string[]
}


export default class Versioned {
  static cache: Map<Versioned, Map<string, JSON>>

  protected version: string
  protected config: JSON
  protected getters: string[]

  constructor(config: JSON) {
    this.config = config
    this.version = '0.0.1'

    this.init()
  }

  public async init() {
    return Promise.all([
      this.setConfigToCache(),
      this.createGetters()
    ])
  }

  private async setConfigToCache() {
    if (!Versioned.cache.has(this)) {
      Versioned.cache.set(this, new Map)
    }
    if (Versioned.cache.get(this).has(this.version)) {
      Versioned.cache.get(this).set(this.version, this.config)
    }
  }

  private async createGetters() {
    this.getters.forEach((prop) => {
      Object.defineProperty(this, prop, {
        value: () => this.current[prop],
      })
    })
  }

  private get current() {
    return this.getCurrentVersion()
  }

  private getCurrentVersion() {
    // @ts-ignore
    return this.constructor.cache.get(this.version).config
  }
}

interface CachedConfig {
  [key: string]: (config: CachedConfig, self: Versioned) => any
}

function cached (config: CachedConfig) {
  return function<T extends new (...args: any[]) => {}>(
    constructor: T
  ) {
    class Cached extends constructor {}
    Object.entries(config).forEach(([key, value]) => {
      Object.defineProperty(Cached.prototype, key, {
        get() {
          return value(this.current.config, this)
        }
      })
    })
    return Cached
  }
}

@cached({
  controller: (config: CachedConfig, self: Versioned): any => config.controller
})
class VersionedController extends Versioned {
  ['constructor'] = VersionedController

  protected version: string
  protected config: any

  constructor(config: any) {
    super(config)
  }
}

class Module extends Versioned {
  ['constructor'] = Module

  protected version: string
  protected config: any

  protected getters: string[] = ['route']

  public route: any

  constructor(config: any) {
    super(config)
  }
}

class Route extends Versioned {
  ['constructor'] = Route

  protected version: string
  protected config: any

  protected getters: string[] = ['controller']

  constructor(config: any) {
    super(config)
  }
}
