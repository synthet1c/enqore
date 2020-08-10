import express from 'express'
import { promises as fs } from 'fs'
import path from 'path'
import { Router } from 'express/lib/router';
import { trace } from '../../../utils/trace'


const router: Router = express.Router()


router.use('/', (req: any, res: any) => {
  fs.readFile(path.resolve(__dirname, './schema.json'), 'utf-8')
    .then(file => JSON.parse(file))
    .then(trace('file'))
    .then(response => res.json(response))
})

export default router