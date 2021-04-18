"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var VersionedController_1;
Object.defineProperty(exports, "__esModule", { value: true });
class Versioned {
    constructor(config) {
        this.config = config;
        this.version = '0.0.1';
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.setConfigToCache(),
                this.createGetters()
            ]);
        });
    }
    setConfigToCache() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Versioned.cache.has(this)) {
                Versioned.cache.set(this, new Map);
            }
            if (Versioned.cache.get(this).has(this.version)) {
                Versioned.cache.get(this).set(this.version, this.config);
            }
        });
    }
    createGetters() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getters.forEach((prop) => {
                Object.defineProperty(this, prop, {
                    value: () => this.current[prop],
                });
            });
        });
    }
    get current() {
        return this.getCurrentVersion();
    }
    getCurrentVersion() {
        // @ts-ignore
        return this.constructor.cache.get(this.version).config;
    }
}
exports.default = Versioned;
function cached(config) {
    return function (constructor) {
        class Cached extends constructor {
        }
        Object.entries(config).forEach(([key, value]) => {
            Object.defineProperty(Cached.prototype, key, {
                get() {
                    return value(this.current.config, this);
                }
            });
        });
        return Cached;
    };
}
let VersionedController = VersionedController_1 = class VersionedController extends Versioned {
    constructor(config) {
        super(config);
        this['constructor'] = VersionedController_1;
    }
};
VersionedController = VersionedController_1 = __decorate([
    cached({
        controller: (config, self) => config.controller
    }),
    __metadata("design:paramtypes", [Object])
], VersionedController);
class Module extends Versioned {
    constructor(config) {
        super(config);
        this['constructor'] = Module;
        this.getters = ['route'];
    }
}
class Route extends Versioned {
    constructor(config) {
        super(config);
        this['constructor'] = Route;
        this.getters = ['controller'];
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmVyc2lvbmVkQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvVmVyc2lvbmVkQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFPQSxNQUFxQixTQUFTO0lBTzVCLFlBQVksTUFBWTtRQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQTtRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUV0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDYixDQUFDO0lBRVksSUFBSTs7WUFDZixPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLGFBQWEsRUFBRTthQUNyQixDQUFDLENBQUE7UUFDSixDQUFDO0tBQUE7SUFFYSxnQkFBZ0I7O1lBQzVCLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDOUIsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLENBQUE7YUFDbkM7WUFDRCxJQUFJLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQy9DLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQTthQUN6RDtRQUNILENBQUM7S0FBQTtJQUVhLGFBQWE7O1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzVCLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRTtvQkFDaEMsS0FBSyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUNoQyxDQUFDLENBQUE7WUFDSixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7S0FBQTtJQUVELElBQVksT0FBTztRQUNqQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFBO0lBQ2pDLENBQUM7SUFFTyxpQkFBaUI7UUFDdkIsYUFBYTtRQUNiLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUE7SUFDeEQsQ0FBQztDQUNGO0FBOUNELDRCQThDQztBQU1ELFNBQVMsTUFBTSxDQUFFLE1BQW9CO0lBQ25DLE9BQU8sVUFDTCxXQUFjO1FBRWQsTUFBTSxNQUFPLFNBQVEsV0FBVztTQUFHO1FBQ25DLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsRUFBRTtZQUM5QyxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO2dCQUMzQyxHQUFHO29CQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFBO2dCQUN6QyxDQUFDO2FBQ0YsQ0FBQyxDQUFBO1FBQ0osQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLE1BQU0sQ0FBQTtJQUNmLENBQUMsQ0FBQTtBQUNILENBQUM7QUFLRCxJQUFNLG1CQUFtQiwyQkFBekIsTUFBTSxtQkFBb0IsU0FBUSxTQUFTO0lBTXpDLFlBQVksTUFBVztRQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFOZixLQUFDLGFBQWEsQ0FBQyxHQUFHLHFCQUFtQixDQUFBO0lBT3JDLENBQUM7Q0FDRixDQUFBO0FBVEssbUJBQW1CO0lBSHhCLE1BQU0sQ0FBQztRQUNOLFVBQVUsRUFBRSxDQUFDLE1BQW9CLEVBQUUsSUFBZSxFQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVTtLQUM5RSxDQUFDOztHQUNJLG1CQUFtQixDQVN4QjtBQUVELE1BQU0sTUFBTyxTQUFRLFNBQVM7SUFVNUIsWUFBWSxNQUFXO1FBQ3JCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQVZmLEtBQUMsYUFBYSxDQUFDLEdBQUcsTUFBTSxDQUFBO1FBS2QsWUFBTyxHQUFhLENBQUMsT0FBTyxDQUFDLENBQUE7SUFNdkMsQ0FBQztDQUNGO0FBRUQsTUFBTSxLQUFNLFNBQVEsU0FBUztJQVEzQixZQUFZLE1BQVc7UUFDckIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBUmYsS0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUE7UUFLYixZQUFPLEdBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQTtJQUk1QyxDQUFDO0NBQ0YifQ==