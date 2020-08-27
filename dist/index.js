"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const utils_1 = require("./utils");
const app = express_1.default();
console.log('log', utils_1.evalObject({
    test: 'this is ${num} a ${1 + 2} test ${test.val} another ${test}',
})({
    test: { val: 'works!' },
    num: 42,
}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUM7QUFFekMsaUNBVWU7QUFDZixtQ0FBOEM7QUFHOUMsTUFBTSxHQUFHLEdBQVcsaUJBQU8sRUFBRSxDQUFBO0FBRTdCLE9BQU8sQ0FBQyxHQUFHLENBQ1QsS0FBSyxFQUNMLGtCQUFVLENBQUM7SUFDVCxJQUFJLEVBQUUsNERBQTREO0NBQ25FLENBQUMsQ0FBQztJQUNELElBQUksRUFBRSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUU7SUFDdkIsR0FBRyxFQUFFLEVBQUU7Q0FDUixDQUFDLENBQ0gsQ0FBQTtBQUVELHFDQUFxQztBQUNyQyw0QkFBNEI7QUFDNUIsSUFBSTtBQUNKLEVBQUU7QUFDRixtREFBbUQ7QUFDbkQsNEJBQTRCO0FBQzVCLGFBQWE7QUFDYixXQUFXO0FBQ1gsa0JBQWtCO0FBQ2xCLE1BQU07QUFDTixJQUFJO0FBQ0osRUFBRTtBQUNGLDRDQUE0QztBQUM1QyxtQ0FBbUM7QUFDbkMsSUFBSTtBQUNKLEVBQUU7QUFDRixVQUFVO0FBQ1YsNkJBQTZCO0FBQzdCLHlCQUF5QjtBQUN6Qix5QkFBeUI7QUFDekIsMkJBQTJCO0FBRTNCLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUNyQixJQUFJLENBQUMsZ0JBQVEsQ0FBQywrQkFBd0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksQ0FBQyxnQkFBUSxDQUFDLHdCQUFpQixDQUFDLENBQUM7S0FDakMsSUFBSSxDQUFDLGdCQUFRLENBQUMsa0JBQVcsQ0FBQyxDQUFDO0tBQzNCLElBQUksQ0FBQyxnQkFBUSxDQUFDLGlCQUFVLENBQUMsQ0FBQztLQUMxQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxxQkFBYyxDQUFDLENBQUM7SUFDL0IsK0JBQStCO0tBQzlCLElBQUksQ0FBQyxnQkFBUSxDQUFDLGtCQUFXLENBQUMsQ0FBQztLQUMzQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7SUFDNUIsOEJBQThCO0tBQzdCLElBQUksQ0FBQyxnQkFBUSxDQUFDLGtCQUFXLENBQUMsQ0FBQztLQUMzQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxtQkFBWSxDQUFDLENBQUMsQ0FBQTtBQUUvQixvQ0FBb0M7QUFDcEMsU0FBUztBQUNULElBQUk7QUFFSiwyQkFBMkI7QUFDM0Isb0NBQW9DO0FBQ3BDLDZCQUE2QjtBQUM3Qix1QkFBdUI7QUFDdkIsc0JBQXNCO0FBQ3RCLDBCQUEwQjtBQUMxQix1QkFBdUI7QUFDdkIsdUJBQXVCO0FBQ3ZCLHVCQUF1QjtBQUN2Qix3QkFBd0IifQ==