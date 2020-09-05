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
        Module._cache.set(config.key, this);
        this.routes = config.routes.map((config) => new Route_1.default(config, this));
    }
    init(app, schema, Db) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.routes.map((route) => route.init(app, this, schema, Db)));
        });
    }
    getRoutes() {
        return this.routes;
    }
    static getByName(name) {
        return Module._cache.get(name);
    }
    static entries() {
        return Module._cache.entries();
    }
}
exports.default = Module;
Module._cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Nb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFHQSxvREFBNEM7QUFHNUMsa0RBQXlCO0FBR3pCLE1BQXFCLE1BQU8sU0FBUSxjQUFJO0lBVXRDLFlBQVksTUFBb0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBVmYsS0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUE7UUFHakIsV0FBTSxHQUFVLEVBQUUsQ0FBQTtRQVF2Qix3QkFBd0I7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUE7UUFDckIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUM3QixDQUFDLE1BQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDakQsQ0FBQTtJQUNILENBQUM7SUFFWSxJQUFJLENBQUMsR0FBVyxFQUFFLE1BQXFCLEVBQUUsRUFBTTs7WUFDMUQsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUNyRSxDQUFBO1FBQ0gsQ0FBQztLQUFBO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ2hDLENBQUM7O0FBdENILHlCQXVDQztBQXBDa0IsYUFBTSxHQUF3QixJQUFJLEdBQUcsRUFBRSxDQUFBIn0=