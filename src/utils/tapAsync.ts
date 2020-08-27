import { trace } from './trace'
/**
 * tapAsync
 *
 * Tap an async function, if no value is returned tap the argument to the next function
 */
export const tapAsync = (fn: (x: any) => Promise<any>) => (
  x: any
): Promise<any> => fn(x).then((y: any) => y || x)
