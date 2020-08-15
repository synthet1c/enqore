import Field from '../models/Field'
import modelInitializer from './modelInitilizer'

export default modelInitializer({
  files: ['fields/*.json', '!fields/fields.json', '!fields/_lock.json'],
  ctor: Field,
})

