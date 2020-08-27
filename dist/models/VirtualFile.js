"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _cache = new Map();
class VirtualFile {
    constructor(_config) {
        this._filename = _config.filename;
        _cache.set(_config.filename, this);
    }
    static getByName(name) {
        return _cache.get(name);
    }
    static entries() {
        return _cache.entries();
    }
}
exports.default = VirtualFile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlydHVhbEZpbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1ZpcnR1YWxGaWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsTUFBTSxNQUFNLEdBQTZCLElBQUksR0FBRyxFQUFFLENBQUE7QUFFbEQsTUFBcUIsV0FBVztJQUU5QixZQUFZLE9BQWU7UUFDekIsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUNwQyxDQUFDO0lBRUQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQzNCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN6QixDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU87UUFDWixPQUFPLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUN6QixDQUFDO0NBQ0Y7QUFkRCw4QkFjQyJ9