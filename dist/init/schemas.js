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
const Schema_1 = __importDefault(require("../models/Schema"));
const utils_1 = require("../utils");
function initSchemas({ app, mongoClient, Db, modules, schema, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = yield utils_1.glob('**/*/*.schema.json', {
            cwd: path_1.default.join(process.cwd(), './src'),
        });
        const configs = yield Promise.all(files.map((file) => db_1.readJSON(file)()));
        configs.forEach((config) => new Schema_1.default(config));
        return { app, mongoClient, Db, modules, schema };
    });
}
exports.default = initSchemas;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L3NjaGVtYXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxnREFBdUI7QUFDdkIsOEJBQWdDO0FBQ2hDLDhEQUFxQztBQUNyQyxvQ0FBK0I7QUFJL0IsU0FBOEIsV0FBVyxDQUFDLEVBQ3hDLEdBQUcsRUFDSCxXQUFXLEVBQ1gsRUFBRSxFQUNGLE9BQU8sRUFDUCxNQUFNLEdBQ1M7O1FBQ2YsTUFBTSxLQUFLLEdBQWEsTUFBTSxZQUFJLENBQUMsb0JBQW9CLEVBQUU7WUFDdkQsR0FBRyxFQUFFLGNBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQztTQUN2QyxDQUFDLENBQUE7UUFFRixNQUFNLE9BQU8sR0FBRyxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsYUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBRXhFLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFpQixFQUFFLEVBQUUsQ0FBQyxJQUFJLGdCQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUUxRCxPQUFPLEVBQUUsR0FBRyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxDQUFBO0lBQ2xELENBQUM7Q0FBQTtBQWhCRCw4QkFnQkMifQ==