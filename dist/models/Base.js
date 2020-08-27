"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Base {
    constructor(options) {
        this._cache = new Map();
    }
    get parent() {
        return this._cache.get(this);
    }
    set parent(parent) {
        this._cache.set(this, parent);
    }
    get schema() {
        let instance = this;
        while (instance) {
            // @ts-ignore
            if (instance._schema)
                return instance._schema;
            // @ts-ignore
            instance = instance.parent;
        }
    }
}
exports.default = Base;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQmFzZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLE1BQXFCLElBQUk7SUFxQnZCLFlBQVksT0FBbUI7UUFwQnJCLFdBQU0sR0FBb0IsSUFBSSxHQUFHLEVBQUUsQ0FBQTtJQW9CWCxDQUFDO0lBbEJuQyxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQzlCLENBQUM7SUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUFZO1FBQ3JCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFBO1FBQ25CLE9BQU8sUUFBUSxFQUFFO1lBQ2YsYUFBYTtZQUNiLElBQUksUUFBUSxDQUFDLE9BQU87Z0JBQUUsT0FBTyxRQUFRLENBQUMsT0FBTyxDQUFBO1lBQzdDLGFBQWE7WUFDYixRQUFRLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQTtTQUMzQjtJQUNILENBQUM7Q0FHRjtBQXRCRCx1QkFzQkMifQ==