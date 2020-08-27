import { prop, always, path } from 'rambda'
import { trace } from './trace'

export const createEvalGetters = (obj: EvalObject): EvalGetters =>
  Object.keys(obj).reduce((acc: EvalObject, key: string) => {
    const value = obj[key]
    if (typeof value === 'string') {
      const reg = /\${([a-z.]+)}/gim
      const match = value.replace(reg, '$1')
      if (match) {
        if (value === '${' + match + '}') {
          // single interpolation property in the string "${something}"
          acc[key] = path(match)
        } else {
          // multiple interpolation properties in the string "stuff ${something} other stuff"
          const replaced = value
            .replace(reg, (_: string, match: string) => {
              const propGetter = match.split('.').reduce(({ acc, cache }: { acc: any[], cache: any[]}, x: string, i: number) => {
                return {
                  acc: acc.concat(([...cache, x]).join('.')),
                  cache: cache.concat(x)
                }
              }, { acc: [], cache: ['props'] })
              return '${(' + propGetter.acc.join(' && ') + ') ? ' + propGetter.acc.pop() + ' : ""}'
            })
          console.log('replaced', replaced)
          // .replace(
          //   reg,
          //   '${~["string", "number"].indexOf(typeof(props?.$1)) ? props.$1 : ""}'
          // )
          acc[key] = new Function('props', 'return `' + replaced + '`')
        }
      } else {
        // non interpolated value
        acc[key] = always(value)
      }
    } else {
      // non interpolated value
      acc[key] = always(value)
    }
    return acc
  }, {})

export const evalGetters = (evalGetters: EvalGetters) => (
  evalProps: EvalProps
) =>
  Object.keys(evalGetters).reduce(
    (acc: EvalProps, key: string) => ({
      ...acc,
      [key]: evalGetters[key](evalProps),
    }),
    {}
  )

export const evalObject = (obj: EvalObject) =>
  evalGetters(createEvalGetters(obj))

export interface EvalObject {
  [key: string]: any
}

export interface EvalGetters {
  [key: string]: (props: EvalProps) => any
}

export interface EvalProps {
  [key: string]: any
}
