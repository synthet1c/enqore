"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
function readFile(filename) {
    const filePath = path_1.resolve(process.cwd(), './src', filename);
    const file = fs_1.default.readFileSync(filePath, 'utf8');
    try {
        return Object.assign({ file: filePath, path: path_1.dirname(filePath) }, JSON.parse(file));
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.default = readFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVhZEZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsK0JBQXVDO0FBUXZDLFNBQXdCLFFBQVEsQ0FBQyxRQUFnQjtJQUMvQyxNQUFNLFFBQVEsR0FBRyxjQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQTtJQUMxRCxNQUFNLElBQUksR0FBRyxZQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUM5QyxJQUFJO1FBQ0YsdUJBQ0UsSUFBSSxFQUFFLFFBQVEsRUFDZCxJQUFJLEVBQUUsY0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUNwQixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUNwQjtLQUNGO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO0FBQ0gsQ0FBQztBQVpELDJCQVlDIn0=