import fs from 'fs'
import path from 'path'
import { Config } from '../models/Extendable'

export default function readGraphQLQueryFile(filename: string): string {
  const file = fs.readFileSync(
    path.resolve(process.cwd(), './src', filename),
    'utf8'
  )
  try {
    return JSON.parse(file)
  } catch (e) {
    throw new Error(e)
  }
}
