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
const path_1 = require("path");
const fs_1 = require("fs");
const Base_1 = __importDefault(require("./Base"));
class File extends Base_1.default {
    constructor(config) {
        super(config);
        this.file = path_1.parse(config.file);
    }
    readFile(filename) {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            return loadFile(filename)(true)
                .catch(loadFile(process.cwd(), './src', filename))
                .catch(loadFile((_a = this.file) === null || _a === void 0 ? void 0 : _a.dir, filename))
                // @ts-ignore
                .catch(loadFile((_c = (_b = this.parent) === null || _b === void 0 ? void 0 : _b.file) === null || _c === void 0 ? void 0 : _c.dir, filename));
        });
    }
    readJSONFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.readFile(filename).then((file) => JSON.parse(file.toString()));
        });
    }
    readTextFile(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.readFile(filename).then((file) => file.toString());
        });
    }
}
exports.default = File;
const loadFile = (...paths) => (x) => __awaiter(void 0, void 0, void 0, function* () {
    if (paths.some(p => p == null)) {
        throw new Error(`path param is undefined`);
    }
    return fs_1.promises.access(path_1.join(...paths))
        .then(x => fs_1.promises.readFile(path_1.resolve(...paths)));
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRmlsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLCtCQUF1RDtBQUN2RCwyQkFBc0Q7QUFDdEQsa0RBQXlCO0FBR3pCLE1BQXFCLElBQUssU0FBUSxjQUFJO0lBR3BDLFlBQVksTUFBa0I7UUFDNUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxZQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7SUFFZSxRQUFRLENBQUMsUUFBZ0I7OztZQUN2QyxPQUFPLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUM7aUJBQzVCLEtBQUssQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztpQkFDakQsS0FBSyxDQUFDLFFBQVEsT0FBQyxJQUFJLENBQUMsSUFBSSwwQ0FBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUM7Z0JBQzFDLGFBQWE7aUJBQ1osS0FBSyxDQUFDLFFBQVEsYUFBQyxJQUFJLENBQUMsTUFBTSwwQ0FBRSxJQUFJLDBDQUFFLEdBQUcsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFBOztLQUNyRDtJQUVlLFlBQVksQ0FBQyxRQUFnQjs7WUFDM0MsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FDNUIsQ0FBQTtRQUNILENBQUM7S0FBQTtJQUVlLFlBQVksQ0FBQyxRQUFnQjs7WUFDM0MsT0FBTyxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBWSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQTtRQUM5RSxDQUFDO0tBQUE7Q0FDRjtBQXpCRCx1QkF5QkM7QUFNRCxNQUFNLFFBQVEsR0FBRyxDQUFDLEdBQUcsS0FBWSxFQUFFLEVBQUUsQ0FBQyxDQUFPLENBQU0sRUFBZ0IsRUFBRTtJQUNuRSxJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUU7UUFDOUIsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO0tBQzNDO0lBQ0QsT0FBTyxhQUFTLENBQUMsTUFBTSxDQUFDLFdBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ3BDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGFBQVMsQ0FBQyxRQUFRLENBQUMsY0FBTyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFBO0FBQ3JELENBQUMsQ0FBQSxDQUFBIn0=