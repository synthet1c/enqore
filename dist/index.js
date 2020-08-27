"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const utils_1 = require("./utils");
const app = express_1.default();
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
    .then(utils_1.tapAsync(init_1.initEnvironmentVariables))
    .then(utils_1.tapAsync(init_1.initRequestParser))
    .then(utils_1.tapAsync(init_1.initSession))
    .then(utils_1.tapAsync(init_1.initFields))
    .then(utils_1.tapAsync(init_1.initComponents))
    // .then(tapAsync(initLayouts))
    .then(utils_1.tapAsync(init_1.initSchemas))
    .then(utils_1.tapAsync(init_1.initGraphQL))
    // .then(tapAsync(initRoutes))
    .then(utils_1.tapAsync(init_1.initModules))
    .then(utils_1.tapAsync(init_1.initListener));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUM7QUFFekMsaUNBVWU7QUFDZixtQ0FBOEM7QUFHOUMsTUFBTSxHQUFHLEdBQVcsaUJBQU8sRUFBRSxDQUFBO0FBRTdCOzs7Ozs7Ozs7O0VBVUU7QUFFRixxQ0FBcUM7QUFDckMsNEJBQTRCO0FBQzVCLElBQUk7QUFDSixFQUFFO0FBQ0YsbURBQW1EO0FBQ25ELDRCQUE0QjtBQUM1QixhQUFhO0FBQ2IsV0FBVztBQUNYLGtCQUFrQjtBQUNsQixNQUFNO0FBQ04sSUFBSTtBQUNKLEVBQUU7QUFDRiw0Q0FBNEM7QUFDNUMsbUNBQW1DO0FBQ25DLElBQUk7QUFDSixFQUFFO0FBQ0YsVUFBVTtBQUNWLDZCQUE2QjtBQUM3Qix5QkFBeUI7QUFDekIseUJBQXlCO0FBQ3pCLDJCQUEyQjtBQUUzQixPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7S0FDckIsSUFBSSxDQUFDLGdCQUFRLENBQUMsK0JBQXdCLENBQUMsQ0FBQztLQUN4QyxJQUFJLENBQUMsZ0JBQVEsQ0FBQyx3QkFBaUIsQ0FBQyxDQUFDO0tBQ2pDLElBQUksQ0FBQyxnQkFBUSxDQUFDLGtCQUFXLENBQUMsQ0FBQztLQUMzQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxpQkFBVSxDQUFDLENBQUM7S0FDMUIsSUFBSSxDQUFDLGdCQUFRLENBQUMscUJBQWMsQ0FBQyxDQUFDO0lBQy9CLCtCQUErQjtLQUM5QixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLGdCQUFRLENBQUMsa0JBQVcsQ0FBQyxDQUFDO0lBQzVCLDhCQUE4QjtLQUM3QixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLGdCQUFRLENBQUMsbUJBQVksQ0FBQyxDQUFDLENBQUE7QUFFL0Isb0NBQW9DO0FBQ3BDLFNBQVM7QUFDVCxJQUFJO0FBRUosMkJBQTJCO0FBQzNCLG9DQUFvQztBQUNwQyw2QkFBNkI7QUFDN0IsdUJBQXVCO0FBQ3ZCLHNCQUFzQjtBQUN0QiwwQkFBMEI7QUFDMUIsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2Qix1QkFBdUI7QUFDdkIsd0JBQXdCIn0=