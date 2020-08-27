"use strict";
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
        this.routes.forEach((route) => route.init(app, this, schema));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Nb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxvREFBNEM7QUFHNUMsa0RBQXlCO0FBRXpCLE1BQXFCLE1BQU8sU0FBUSxjQUFJO0lBVXRDLFlBQVksTUFBb0I7UUFDOUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBVmYsS0FBQyxhQUFhLENBQUMsR0FBRyxNQUFNLENBQUE7UUFHZCxXQUFNLEdBQVUsRUFBRSxDQUFBO1FBUTFCLHdCQUF3QjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUM3QixDQUFDLE1BQW1CLEVBQUUsRUFBRSxDQUFDLElBQUksZUFBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FDakQsQ0FBQTtJQUNILENBQUM7SUFFRCxJQUFJLENBQUMsR0FBVyxFQUFFLE1BQXFCO1FBQ3JDLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRUQsU0FBUztRQUNQLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDaEMsQ0FBQzs7QUEvQkgseUJBZ0NDO0FBN0JrQixhQUFNLEdBQXdCLElBQUksR0FBRyxFQUFFLENBQUEifQ==