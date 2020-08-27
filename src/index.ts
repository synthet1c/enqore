import express, { Server } from 'express'

import {
  initComponents,
  initEnvironmentVariables,
  initFields,
  initGraphQL,
  initListener,
  initModules,
  initRequestParser,
  initSchemas,
  initSession,
} from './init'
import { tapAsync, evalObject } from './utils'
import { AppInitializer } from './init/modelInitilizer'

const app: Server = express()

/*
console.log(
  'log',
  evalObject({
    test: 'this is ${num} a ${1 + 2} test ${test.val} another ${test}',
  })({
    test: { val: 'works!' },
    num: 42,
  })
)
*/

// async function one({ foo }: any) {
//   console.log('one', foo)
// }
//
// async function two({ foo }: any): Promise<any> {
//   console.log('two', foo)
//   return {
//     foo,
//     bar: 'bar',
//   }
// }
//
// async function three({ foo, bar }: any) {
//   console.log('three', foo, bar)
// }
//
// Promise
//   .resolve({ foo: 'foo' })
//   .then(tapAsync(one))
//   .then(tapAsync(two))
//   .then(tapAsync(three))

Promise.resolve({ app })
  .then(tapAsync(initEnvironmentVariables))
  .then(tapAsync(initRequestParser))
  .then(tapAsync(initSession))
  .then(tapAsync(initFields))
  .then(tapAsync(initComponents))
  // .then(tapAsync(initLayouts))
  .then(tapAsync(initSchemas))
  .then(tapAsync(initGraphQL))
  // .then(tapAsync(initRoutes))
  .then(tapAsync(initModules))
  .then(tapAsync(initListener))

// const initApp: AppInitializer = {
//   app,
// }

// Promise.resolve({ app })
//   .then(initEnvironmentVariables)
//   .then(initRequestParser)
//   .then(initSession)
//   .then(initFields)
//   .then(initComponents)
//   .then(initSchemas)
//   .then(initGraphQL)
//   .then(initModules)
//   .then(initListener)
