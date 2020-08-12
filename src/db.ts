import { promises as fs } from 'fs'
import path from 'path'
import R, { map, where, equals, filter, nth, find, compose } from 'rambda'
import { trace } from './utils'
import { ModelJSON } from './models/Model'

export interface Record {
  id: number

  [key: string]: any
}

export interface Author {
  name: string
  id: number
}

export interface Book {
  title: string
  id: number

  [key: string]: any
}

export interface File {
  id: number
  _data: Record
  _file: Array<Record>
}

export const readJSON = (file: string) => (): Promise<ModelJSON | JSON | any> =>
  fs
    .readFile(path.resolve(process.cwd(), 'src/', file), 'utf8')
    .then((data: any) => JSON.parse(data))

export const writeJSON = (file: string) => (data: any): Promise<any> =>
  fs.writeFile(
    path.resolve(process.cwd(), 'src/data', file),
    JSON.stringify(data, null, 2),
    {
      encoding: 'utf8',
    }
  )

export const appendJSON = (file: string) => (data: any) =>
  readJSON(file)()
    .then(
      (records: Record[]): File => {
        const record: Record = {
          id: records.length + 1,
          ...data,
        }
        return {
          id: record.id,
          _data: record,
          _file: records.concat(record),
        }
      }
    )
    .then(({ _file, _data }: File) =>
      writeJSON(file)(_file).then(R.always(_data)).then(trace('append'))
    )

export const updateJSON = (file: string) => (data: any) =>
  readJSON(file)()
    .then(
      R.map((row: Record) => {
        if (data.id === row.id) return { ...data }
        return row
      })
    )
    .then(R.tap(writeJSON(file)))
    .then(R.filter((row: Record) => row.id === data.id))

export const deleteJSON = (file: string) => (data: any) =>
  readJSON(file)()
    .then(R.filter((row: Record) => row[data.key] !== data.value))
    .then(R.tap(writeJSON(file)))
    .then(R.always(data.id))

const unary = (fn: Function) => (x: any) => fn(x)

// query :: {k: v} -> {k: v} -> boolean
// return true if all properties in the conditions object match the input object
const query = (conditions: any) => where(map(unary(equals), conditions))

// @ts-ignore
export const searchJSON = (file: string) => (data: any) =>
  readJSON(file)().then(filter(unary(query(data))))

// @ts-ignore
export const findJSON = (file: string) => (data: any) =>
  readJSON(file)().then(find(unary(query(data))))

// { id: [1, 2, 3 ]}
export const searchInJSON = (file: string) => (data: any) =>
  readJSON(file)().then(
    filter((record: Record) => {
      return Object.entries(
        data
      ).every(([key, values]: [string, any[]]): boolean =>
        values.includes(record[key])
      )
    })
  )

export const findInJSON = (file: string) => (data: any) =>
  readJSON(file)().then(
    filter((record: Record) => {
      return Object.entries(
        data
      ).every(([key, values]: [string, any[]]): boolean =>
        values.includes(record[key])
      )
    })
  )

export const crud = (file: string) => ({
  read: readJSON(file),
  create: appendJSON(file),
  update: updateJSON(file),
  delete: deleteJSON(file),
  find: findJSON(file),
  search: searchJSON(file),
  searchIn: searchInJSON(file),
  findIn: findInJSON(file),
})

export const db = {
  authors: crud('data/authors.json'),
  books: crud('data/books.json'),
  publishers: crud('data/publishers.json'),
  test: crud('data/test.json'),
}

console.log(db.authors.find({ id: 2 }))
