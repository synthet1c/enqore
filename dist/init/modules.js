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
const Module_1 = __importDefault(require("../models/Module"));
const globby_1 = __importDefault(require("globby"));
const path_1 = __importDefault(require("path"));
const readFile_1 = __importDefault(require("../utils/readFile"));
const rambda_1 = require("rambda");
// import { readJSON } from '../db'
function initializeModules({ app, Db, schema, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield globby_1.default('**/*/*.module.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        const modules = yield Promise.all(files.map(readFile_1.default));
        const _modules = modules.map((module) => new Module_1.default(module));
        // initialize all the modules
        return Promise.all(_modules.map((module) => module.init(app, schema, Db)))
            .then(rambda_1.tap((responses) => {
            console.log(_modules);
        }))
            .then((x) => ({
            app,
            schema,
            modules: _modules,
        }));
    });
}
exports.default = initializeModules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L21vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBdUQ7QUFFdkQsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixpRUFBd0M7QUFFeEMsbUNBQTRCO0FBQzVCLG1DQUFtQztBQUVuQyxTQUE4QixpQkFBaUIsQ0FBQyxFQUM5QyxHQUFHLEVBQ0gsRUFBRSxFQUNGLE1BQU0sR0FDUzs7UUFDZixNQUFNLEtBQUssR0FBYSxNQUFNLGdCQUFNLENBQUMsb0JBQW9CLEVBQUU7WUFDekQsR0FBRyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQztTQUN2QyxDQUFDLENBQUE7UUFFRixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxrQkFBUSxDQUFDLENBQUMsQ0FBQTtRQUV0RCxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUVqRSw2QkFBNkI7UUFDN0IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFLElBQUksQ0FBQyxZQUFHLENBQUMsQ0FBQyxTQUFjLEVBQUUsRUFBRTtZQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO2FBQ0YsSUFBSSxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ2pCLEdBQUc7WUFDSCxNQUFNO1lBQ04sT0FBTyxFQUFFLFFBQVE7U0FDbEIsQ0FBQyxDQUFDLENBQUE7SUFHUCxDQUFDO0NBQUE7QUF6QkQsb0NBeUJDIn0=