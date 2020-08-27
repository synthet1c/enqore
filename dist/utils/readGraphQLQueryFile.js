"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readGraphQLQueryFile(filename) {
    const file = fs_1.default.readFileSync(path_1.default.resolve(process.cwd(), './src', filename), 'utf8');
    try {
        return JSON.parse(file);
    }
    catch (e) {
        throw new Error(e);
    }
}
exports.default = readGraphQLQueryFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEdyYXBoUUxRdWVyeUZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVhZEdyYXBoUUxRdWVyeUZpbGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw0Q0FBbUI7QUFDbkIsZ0RBQXVCO0FBR3ZCLFNBQXdCLG9CQUFvQixDQUFDLFFBQWdCO0lBQzNELE1BQU0sSUFBSSxHQUFHLFlBQUUsQ0FBQyxZQUFZLENBQzFCLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsRUFDOUMsTUFBTSxDQUNQLENBQUE7SUFDRCxJQUFJO1FBQ0YsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO0tBQ3hCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ25CO0FBQ0gsQ0FBQztBQVZELHVDQVVDIn0=