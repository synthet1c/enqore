"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const init_1 = require("./init");
const app = express_1.default();
const tapAsync = (fn) => (x) => fn(x).then((_) => x);
Promise.resolve(app)
    .then(tapAsync(init_1.initEnvironmentVariables))
    .then(tapAsync(init_1.initRequestParser))
    .then(tapAsync(init_1.initSession))
    .then(tapAsync(init_1.initFields))
    .then(tapAsync(init_1.initComponents))
    .then(tapAsync(init_1.initLayouts))
    .then(tapAsync(init_1.initSchemas))
    .then(tapAsync(init_1.initGraphQL))
    .then(tapAsync(init_1.initRoutes))
    .then(tapAsync(init_1.initModules))
    .then(tapAsync((x) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(File.entries())
    return yield Promise.resolve(true);
})))
    .then(tapAsync(init_1.initListener));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxzREFBeUM7QUFHekMsaUNBWWU7QUFFZixNQUFNLEdBQUcsR0FBVyxpQkFBTyxFQUFFLENBQUE7QUFFN0IsTUFBTSxRQUFRLEdBQUcsQ0FBQyxFQUErQixFQUFFLEVBQUUsQ0FBQyxDQUNwRCxDQUFTLEVBQ1EsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBRS9DLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDO0tBQ2pCLElBQUksQ0FBQyxRQUFRLENBQUMsK0JBQXdCLENBQUMsQ0FBQztLQUN4QyxJQUFJLENBQUMsUUFBUSxDQUFDLHdCQUFpQixDQUFDLENBQUM7S0FDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBVSxDQUFDLENBQUM7S0FDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxxQkFBYyxDQUFDLENBQUM7S0FDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxpQkFBVSxDQUFDLENBQUM7S0FDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBVyxDQUFDLENBQUM7S0FDM0IsSUFBSSxDQUNILFFBQVEsQ0FBQyxDQUFPLENBQVMsRUFBRSxFQUFFO0lBQzNCLDhCQUE4QjtJQUM5QixPQUFPLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNwQyxDQUFDLENBQUEsQ0FBQyxDQUNIO0tBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQyxtQkFBWSxDQUFDLENBQUMsQ0FBQSJ9