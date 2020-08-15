import Component from '../models/Component'
import modelInitializer from './modelInitilizer'

export default modelInitializer({
  files: ['**/*/*.component.json'],
  ctor: Component,
})

