import _glob from 'glob'
import util from 'util'

export const glob = util.promisify(_glob)
