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
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
function readFile(filename) {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield fs_1.promises
            .readFile(filename, 'utf8')
            .then((file) => JSON.parse(file));
        return file;
    });
}
exports.default = readFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVhZEpTT04uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvcmVhZEpTT04udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSwyQkFBbUM7QUFFbkMsU0FBOEIsUUFBUSxDQUFDLFFBQWdCOztRQUNyRCxNQUFNLElBQUksR0FBRyxNQUFNLGFBQUU7YUFDbEIsUUFBUSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUM7YUFDMUIsSUFBSSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7UUFDM0MsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0NBQUE7QUFMRCwyQkFLQyJ9