import { Merge } from 'rambda'

export default class Page {
  private readonly page: PageJSON
  private components: PageComponent[]
  private data: any

  private static cache: Map<string, Page> = new Map()

  constructor(page: PageJSON) {
    this.page = page
    Page.cache.set(page.name, this)
  }

  static getPage(name: string): Page {
    return Page.cache.get(name)
  }
}

export interface PageJSON {
  name: string
  template: string
  slug: string
  extends: PageExtends
  fields: PageFields
  meta: PageMeta
  data: string
  components: PageComponent[]
  route: PageRoute
}

export interface PageFields {
  [key: string]: string
}

export interface PageParams {
  [key: string]: string
}

export interface PageMeta {
  title: string
  description: string
}

export interface PageExtends {
  name: string
  merge: PageExtendsMerge | MergeType
}

export interface PageRoute {
  url: string
  get: PageParams
  params: PageParams
}

export type MergeType =
  | 'overwrite'
  | 'merge'
  | 'mergeDeep'
  | 'mergeLeft'
  | 'mergeRight'

export interface PageExtendsMerge {
  meta: MergeType
  components: MergeType
  fields: MergeType
}

export interface PageComponent {
  name: string
  components: PageComponent[]
  fields: PageFields
}
