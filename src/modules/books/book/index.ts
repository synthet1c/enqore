import express from 'express'
import { Router } from 'express/lib/router'

const router: Router = express.Router()

router.use('/', (req: any, res: any) => {
  res.json({ test: true })
})

export default router