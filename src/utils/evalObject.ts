import { prop, always } from 'rambda'

export const createEvalGetters = (obj: EvalObject): EvalGetters =>
  Object.keys(obj).reduce((acc: EvalObject, key: string) => {
    const value = obj[key]
    if (typeof value === 'string') {
      const reg = /\${([a-z.]+)}/gim
      const match = value.replace(reg, '$1')
      if (match) {
        if (value === '${' + match + '}') {
          // single interpolation property in the string "${something}"
          acc[key] = prop(match)
        } else {
          // multiple interpolation properties in the string "stuff ${something} other stuff"
          acc[key] = (props: EvalProps) => {
            const replaced = value.replace(reg, '${~["string", "number"].indexOf(typeof(props.$1)) ? props.$1 : ""}')
            return new Function('props', 'return `' + replaced + '`')(props)
          }
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

export const evalObject = (obj: EvalObject) => evalGetters(createEvalGetters(obj))

export interface EvalObject {
  [key: string]: any
}

export interface EvalGetters {
  [key: string]: (props: EvalProps) => any
}

export interface EvalProps {
  [key: string]: any
}
