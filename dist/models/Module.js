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
const Route_1 = __importDefault(require("./Route"));
const File_1 = __importDefault(require("./File"));
class Module extends File_1.default {
    constructor(config) {
        super(config);
        this['constructor'] = Module;
        this.routes = [];
        // this._config = config
        this.name = config.name;
        this.url = config.url;
        this.key = config.key;
        this.routes = config.routes.map((config) => new Route_1.default(config, this));
    }
    init(app, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.routes.map((route) => route.init(app, this, schema)));
        });
    }
    getRoutes() {
        return this.routes;
    }
    static getByName(name) {
        return Module._cache.get(name);
    }
}
exports.default = Module;
Module._cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Nb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxvREFBNEM7QUFHNUMsa0RBQXlCO0FBRXpCLE1BQXFCLE1BQU8sU0FBUSxjQUFJO0lBVXRDLFlBQVksTUFBb0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBVmYsS0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUE7UUFHZCxXQUFNLEdBQVUsRUFBRSxDQUFBO1FBUTFCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUM3QixDQUFDLE1BQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDakQsQ0FBQTtJQUNILENBQUM7SUFFWSxJQUFJLENBQUMsR0FBVyxFQUFFLE1BQXFCOztZQUNsRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQ2hCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FDakUsQ0FBQTtRQUNILENBQUM7S0FBQTtJQUVELFNBQVM7UUFDUCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUVELE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBWTtRQUMzQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ2hDLENBQUM7O0FBakNILHlCQWtDQztBQS9Ca0IsYUFBTSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFBIn0=