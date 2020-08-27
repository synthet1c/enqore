"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Extendable_1 = __importDefault(require("./Extendable"));
class Field extends Extendable_1.default {
    constructor(config) {
        super(config);
        this.default = config.default;
        this.description = config.description;
        this.input = config.input;
        this.key = config.key;
        this.name = config.name;
        this.type = config.type;
        Field._cache.set(config.key, this);
    }
    static getEntries() {
        return Field._cache.entries();
    }
    static getByName(name) {
        return Field._cache.get(name);
    }
    getExtensionObject() {
        if (typeof this._config.extends === 'string') {
            return Field._cache.get(this._config.extends);
        }
    }
    static of(_config) {
        return new Field(_config);
    }
    static evaluate(fields) {
        const acc = {};
        for (const [key, value] of Object.entries(fields)) {
            const field = Field.getByName(key);
            acc[key] = value || field.default;
        }
        return acc;
    }
}
exports.default = Field;
Field._cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL0ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQ0EsOERBQTJEO0FBRTNELE1BQXFCLEtBQU0sU0FBUSxvQkFBVTtJQVMzQyxZQUFZLE1BQW1CO1FBQzdCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUM3QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDckMsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFBO1FBQ3pCLElBQUksQ0FBQyxHQUFHLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDdkIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLEtBQUssQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVO1FBQ3RCLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUMvQixDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQ2xDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzVDLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUM5QztJQUNILENBQUM7SUFFTSxNQUFNLENBQUMsRUFBRSxDQUFDLE9BQW9CO1FBQ25DLE9BQU8sSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDM0IsQ0FBQztJQUVNLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBVztRQUNoQyxNQUFNLEdBQUcsR0FBUSxFQUFFLENBQUE7UUFDbkIsS0FBSyxNQUFNLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7WUFDakQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNsQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUE7U0FDbEM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNaLENBQUM7O0FBN0NILHdCQThDQztBQTdDa0IsWUFBTSxHQUF1QixJQUFJLEdBQUcsRUFBRSxDQUFBIn0=