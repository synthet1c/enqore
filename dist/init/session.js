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
// @ts-ignore
const express_session_1 = __importDefault(require("express-session"));
function initSession({ app }) {
    return __awaiter(this, void 0, void 0, function* () {
        app.use(express_session_1.default({
            resave: false,
            saveUninitialized: false,
            secret: 'Who\'s the baddest of them all?',
        }));
    });
}
exports.default = initSession;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Vzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbml0L3Nlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxhQUFhO0FBQ2Isc0VBQXFDO0FBSXJDLFNBQThCLFdBQVcsQ0FBQyxFQUFFLEdBQUcsRUFBa0I7O1FBRS9ELEdBQUcsQ0FBQyxHQUFHLENBQUMseUJBQU8sQ0FBQztZQUNkLE1BQU0sRUFBRSxLQUFLO1lBQ2IsaUJBQWlCLEVBQUUsS0FBSztZQUN4QixNQUFNLEVBQUUsaUNBQWlDO1NBQzFDLENBQUMsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUFBO0FBUEQsOEJBT0MifQ==