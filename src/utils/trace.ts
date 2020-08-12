export const trace = (tag: string) => (...xs: any[]) => {
  // tslint:disable-next-line:no-console
  console.log(tag, ...xs)
  return xs[0]
}