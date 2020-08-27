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
const path_1 = __importDefault(require("path"));
const db_1 = require("../db");
const Model_1 = __importDefault(require("../models/Model"));
const glob_1 = __importDefault(require("glob"));
const util_1 = __importDefault(require("util"));
const glob = util_1.default.promisify(glob_1.default);
function initModels(app) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield glob('**/*/book.schema.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        const configs = yield Promise.all(files.map((file) => db_1.readJSON(file)()));
        // @ts-ignore
        const models = configs.map((config) => new Model_1.default(config));
        return app;
    });
}
exports.default = initModels;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luaXQvbW9kZWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXVCO0FBQ3ZCLDhCQUFnQztBQUNoQyw0REFBbUM7QUFDbkMsZ0RBQXdCO0FBQ3hCLGdEQUF1QjtBQUV2QixNQUFNLElBQUksR0FBRyxjQUFJLENBQUMsU0FBUyxDQUFDLGNBQUssQ0FBQyxDQUFBO0FBRWxDLFNBQThCLFVBQVUsQ0FBQyxHQUFXOztRQUNsRCxNQUFNLEtBQUssR0FBYSxNQUFNLElBQUksQ0FBQyx1QkFBdUIsRUFBRTtZQUMxRCxHQUFHLEVBQUUsY0FBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxDQUFDO1NBQ3ZDLENBQUMsQ0FBQTtRQUVGLE1BQU0sT0FBTyxHQUFHLE1BQU0sT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxhQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFFeEUsYUFBYTtRQUNiLE1BQU0sTUFBTSxHQUFZLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFFbEUsT0FBTyxHQUFHLENBQUE7SUFDWixDQUFDO0NBQUE7QUFYRCw2QkFXQyJ9