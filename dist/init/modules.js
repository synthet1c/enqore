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
// import { readJSON } from '../db'
function initializeModules({ app, schema, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield globby_1.default('**/*/*.module.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        console.log('files', files);
        const modules = yield Promise.all(files.map(readFile_1.default));
        const _modules = modules.map((module) => new Module_1.default(module));
        _modules.forEach((module) => module.init(app, schema));
        console.log(_modules);
        return {
            app,
            schema,
            modules: _modules,
        };
    });
}
exports.default = initializeModules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L21vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBdUQ7QUFFdkQsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixpRUFBd0M7QUFFeEMsbUNBQW1DO0FBRW5DLFNBQThCLGlCQUFpQixDQUFDLEVBQzlDLEdBQUcsRUFDSCxNQUFNLEdBQ1M7O1FBQ2YsTUFBTSxLQUFLLEdBQWEsTUFBTSxnQkFBTSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pELEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7U0FDdkMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFFM0IsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDLENBQUE7UUFFdEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFFakUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUV0RCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBRXJCLE9BQU87WUFDTCxHQUFHO1lBQ0gsTUFBTTtZQUNOLE9BQU8sRUFBRSxRQUFRO1NBQ2xCLENBQUE7SUFDSCxDQUFDO0NBQUE7QUF2QkQsb0NBdUJDIn0=