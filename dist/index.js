"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const utils_1 = require("./utils");
const app = express_1.default();
Promise.resolve({ app })
    .then(utils_1.tapAsync(init_1.initEnvironmentVariables))
    .then(utils_1.tapAsync(init_1.initRequestParser))
    .then(utils_1.tapAsync(init_1.initSession))
    .then(utils_1.tapAsync(init_1.initMongoDB))
    .then(utils_1.tapAsync(init_1.initFields))
    .then(utils_1.tapAsync(init_1.initComponents))
    // .then(tapAsync(initLayouts))
    .then(utils_1.tapAsync(init_1.initSchemas))
    .then(utils_1.tapAsync(init_1.initGraphQL))
    // .then(tapAsync(initRoutes))
    .then(utils_1.tapAsync(init_1.initModules))
    .then(utils_1.tapAsync(init_1.initListener));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxzREFBeUM7QUFFekMsaUNBV2U7QUFDZixtQ0FBcUQ7QUFFckQsTUFBTSxHQUFHLEdBQVcsaUJBQU8sRUFBRSxDQUFBO0FBRTdCLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztLQUNyQixJQUFJLENBQUMsZ0JBQVEsQ0FBQywrQkFBd0IsQ0FBQyxDQUFDO0tBQ3hDLElBQUksQ0FBQyxnQkFBUSxDQUFDLHdCQUFpQixDQUFDLENBQUM7S0FDakMsSUFBSSxDQUFDLGdCQUFRLENBQUMsa0JBQVcsQ0FBQyxDQUFDO0tBQzNCLElBQUksQ0FBQyxnQkFBUSxDQUFDLGtCQUFXLENBQUMsQ0FBQztLQUMzQixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxpQkFBVSxDQUFDLENBQUM7S0FDMUIsSUFBSSxDQUFDLGdCQUFRLENBQUMscUJBQWMsQ0FBQyxDQUFDO0lBQy9CLCtCQUErQjtLQUM5QixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLGdCQUFRLENBQUMsa0JBQVcsQ0FBQyxDQUFDO0lBQzVCLDhCQUE4QjtLQUM3QixJQUFJLENBQUMsZ0JBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLGdCQUFRLENBQUMsbUJBQVksQ0FBQyxDQUFDLENBQUEifQ==