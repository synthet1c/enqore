import Route from '../models/Route'
import modelInitializer from './modelInitilizer'

export default modelInitializer({
  files: ['**/*/*.route.json'],
  ctor: Route,
})
