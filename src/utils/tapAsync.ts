import { trace } from './trace'
/**
 * tapAsync
 *
 * Tap an async function, if no value is returned tap the argument to the next function
 */
export const tapAsync = <X,Y>(fn: (x: X) => Promise<Y|void>) => (
  x: X
): Promise<X|Y> => fn(x).then((y: Y) => y || x)
