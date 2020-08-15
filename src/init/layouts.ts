import Layout from '../models/Layout'
import modelInitializer from './modelInitilizer'

export default modelInitializer({
  files: ['**/*.layout.json'],
  ctor: Layout,
})
