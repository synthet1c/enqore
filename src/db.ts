import {promises as fs} from "fs";
import path from "path";
import R from "rambda";
import {trace} from "./utils";

export interface Record {
  id: number,
  [key: string]: any
}

export interface Author {
  name: string,
  id: number,
}

export interface Book {
  title: string,
  id: number,
  [key: string]: any
}

export interface File {
  id : number,
  _data: Record,
  _file: Array<Record>,
}

export const readJSON = (file: string) => (): Promise<Record[]> =>
  fs.readFile(path.resolve(__dirname, '../data', file), 'utf8')
    .then((data: any) => JSON.parse(data))


export const writeJSON = (file: string) => (data: any): Promise<any> =>
  fs.writeFile(path.resolve(__dirname, '../data', file), JSON.stringify(data, null, 2), {
    encoding: 'utf8'
  })


export const appendJSON = (file: string) => (data: any) => readJSON(file)()
  .then((records: Record[]): File => {
    const record: Record = {
      id: records.length + 1,
      ...data
    }
    return {
      id: record.id,
      _data: record,
      _file: records.concat(record)
    }
  })
  .then(({_file, _data }: File) =>
    writeJSON(file)(_file)
      .then(R.always(_data))
      .then(trace('append'))
  )


export const updateJSON = (file: string) => (data: any) => readJSON(file)()
  .then(R.map((row: Record) => {
    if (data.id === row.id) return { ...data }
    return row
  }))
  .then(R.tap(writeJSON(file)))
  .then(R.filter((row: Record) => row.id === data.id))


export const deleteJSON = (file: string) => (data: any) => readJSON(file)()
  .then(R.filter((row: Record) => row.id !== data.id))
  .then(R.tap(writeJSON(file)))
  .then(R.always(data.id))


export const findJSON = (file: string) => (data: any) => readJSON(file)()
  .then((records: Record[]) =>
    records.find((record: Record) => record.id === data.id)
  )


export const crud = (file: string) => ({
  read: readJSON(file),
  create: appendJSON(file),
  update: updateJSON(file),
  delete: deleteJSON(file),
  find: findJSON(file),
})


export const db = {
  authors: crud('authors.json'),
  books: crud('books.json'),
  test: crud('test.json'),
  find: trace('db::find')
}
