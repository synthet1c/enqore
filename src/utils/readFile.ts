import fs from 'fs'
import { dirname, resolve } from 'path'
import { Config } from '../models/Extendable'

export interface File {
  file: string
  path: string
}

export default function readFile(filename: string): Config {
  const filePath = resolve(process.cwd(), './src', filename)
  const file = fs.readFileSync(filePath, 'utf8')
  try {
    return {
      file: filePath,
      path: dirname(filePath),
      ...JSON.parse(file),
    }
  } catch (e) {
    throw new Error(e)
  }
}
