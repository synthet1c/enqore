export class ComponentData {
  private readonly _config: ComponentDataConfig
  constructor(_config: ComponentDataConfig) {
    this._config = _config
  }

  public async data() {}
}

interface ComponentDataConfig {}
