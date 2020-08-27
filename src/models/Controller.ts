import Layout from './Layout'
import readFile from '../utils/readFile'
import { readFileSync } from 'fs'
import path from 'path'
import Base from './Base'
import File from './File'

export default class Controller extends File {
  ['constructor'] = Controller
  public blocks: any
  public fields: any
  public data: object
  public key: string
  public layout: Layout
  public meta: any
  public name: string
  public params: any
  public path: string
  public query: string
  public queryFile: string
  public template: string
  public components: any[]

  constructor(config: any, parent: Base) {
    super(config)
    this.parent = parent
    this.blocks = config.blocks
    this.fields = config.fields
    this.queryFile = config.data
    this.key = config.key
    this.layout = new Layout(readFile(config.layout))
    this.meta = config.meta
    this.name = config.name
    this.params = config.params
    this.template = config.template
    this.getQuery()
    this.initLayout()
  }

  public async init(parent: Base) {
    this.parent = parent
    return this.layout.init(this)
  }

  private getQuery() {
    if (this.queryFile) {
      this.readTextFile(this.queryFile)
        .then((file) => {
          this.query = file
        })
        .catch((e: any) => {
          // console.log('Unable to load file', this.queryFile, e)
        })
    }
  }

  private initLayout() {
    this.layout.initBlocks(this.blocks)
  }
}
