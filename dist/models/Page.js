"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Page {
    constructor(page) {
        this.page = page;
        Page.cache.set(page.name, this);
    }
    static getPage(name) {
        return Page.cache.get(name);
    }
}
exports.default = Page;
Page.cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvUGFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQXFCLElBQUk7SUFPdkIsWUFBWSxJQUFjO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDakMsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBWTtRQUN6QixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzdCLENBQUM7O0FBZEgsdUJBZUM7QUFWZ0IsVUFBSyxHQUFzQixJQUFJLEdBQUcsRUFBRSxDQUFBIn0=