import { omit } from 'rambda'

export const convertProps = (converter: any) => (props: any) => {
  return Object.entries(converter).reduce(
    (acc: any, [key, value]: [string, string]) => {
      if (acc[key]) {
        return omit([key], {
          ...acc,
          [value]: acc[key],
        })
      }
      return acc
    },
    props
  )
}
