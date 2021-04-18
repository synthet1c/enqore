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
function initializeModules(initializer) {
    return __awaiter(this, void 0, void 0, function* () {
        const { app, Db, schema } = initializer;
        const files = yield globby_1.default('**/*/*.module.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        const modules = yield Promise.all(files.map(readFile_1.default));
        const _modules = modules.map((module) => new Module_1.default(module));
        // initialize all the modules
        yield Promise.all(_modules.map((module) => module.init(app, schema, Db)));
        return Object.assign(Object.assign({}, initializer), { modules: _modules });
    });
}
exports.default = initializeModules;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L21vZHVsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSw4REFBdUQ7QUFDdkQsb0RBQTJCO0FBQzNCLGdEQUF1QjtBQUN2QixpRUFBd0M7QUFFeEMsU0FBOEIsaUJBQWlCLENBQzdDLFdBQTJCOztRQUUzQixNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsR0FBRyxXQUFXLENBQUE7UUFFdkMsTUFBTSxLQUFLLEdBQWEsTUFBTSxnQkFBTSxDQUFDLG9CQUFvQixFQUFFO1lBQ3pELEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7U0FDdkMsQ0FBQyxDQUFBO1FBRUYsTUFBTSxPQUFPLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsa0JBQVEsQ0FBQyxDQUFDLENBQUE7UUFFdEQsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxnQkFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFFakUsNkJBQTZCO1FBQzdCLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FDZixRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FDdkQsQ0FBQTtRQUVELHVDQUNLLFdBQVcsS0FDZCxPQUFPLEVBQUUsUUFBUSxJQUNsQjtJQUNILENBQUM7Q0FBQTtBQXRCRCxvQ0FzQkMifQ==