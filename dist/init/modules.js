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
function initializeModules({ app, schema, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield globby_1.default('**/*/*.module.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        const modules = yield Promise.all(files.map(readFile_1.default));
        const _modules = modules.map((module) => new Module_1.default(module));
        // initialize all the modules
        return Promise.all(_modules.map((module) => module.init(app, schema)))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L21vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBdUQ7QUFFdkQsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixpRUFBd0M7QUFFeEMsbUNBQTRCO0FBQzVCLG1DQUFtQztBQUVuQyxTQUE4QixpQkFBaUIsQ0FBQyxFQUM5QyxHQUFHLEVBQ0gsTUFBTSxHQUNTOztRQUNmLE1BQU0sS0FBSyxHQUFhLE1BQU0sZ0JBQU0sQ0FBQyxvQkFBb0IsRUFBRTtZQUN6RCxHQUFHLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGtCQUFRLENBQUMsQ0FBQyxDQUFBO1FBRXRELE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLElBQUksZ0JBQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBRWpFLDZCQUE2QjtRQUM3QixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQzthQUNuRSxJQUFJLENBQUMsWUFBRyxDQUFDLENBQUMsU0FBYyxFQUFFLEVBQUU7WUFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQzthQUNGLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztZQUNqQixHQUFHO1lBQ0gsTUFBTTtZQUNOLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUMsQ0FBQyxDQUFBO0lBR1AsQ0FBQztDQUFBO0FBeEJELG9DQXdCQyJ9