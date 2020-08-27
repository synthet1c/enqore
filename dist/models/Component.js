"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Extendable_1 = __importDefault(require("./Extendable"));
const VirtualFile_1 = __importDefault(require("./VirtualFile"));
const path_1 = __importDefault(require("path"));
class Component extends Extendable_1.default {
    constructor(_config) {
        super(_config);
        Component._cache.set(_config.key, this);
    }
    static getLayout(name) {
        return Component._cache.get(name);
    }
    static getEntries() {
        return Component._cache.entries();
    }
    static getByName(name) {
        return Component._cache.get(name);
    }
    getExtensionObject() {
        if (typeof this._config.extends === 'string') {
            const _file = VirtualFile_1.default.getByName(this._config.extends);
            if (_file) {
                return _file;
            }
            return Component._cache.get(this._config.extends);
        }
        return {};
    }
    static of(_config) {
        return new Component(_config);
    }
    static prepareComponent(component) {
        const obj = Component.getByName(component.type);
        if (!obj)
            return component;
        const config = obj.getConfig();
        if (config === null || config === void 0 ? void 0 : config.data) {
            console.log('path', path_1.default.resolve(process.cwd(), 'src/', config.data));
        }
        return component;
        return Object.assign(Object.assign({}, component), ((config === null || config === void 0 ? void 0 : config.data) && {
            data: () => Promise.resolve().then(() => __importStar(require(config.data))).then((module) => module.data()),
        }));
    }
    static mapComponents(fn, components) {
        return components.map((component) => {
            const _component = fn(component);
            if (_component.components) {
                _component.components = Component.mapComponents(fn, _component.components);
            }
            return _component;
        });
    }
}
exports.default = Component;
Component._cache = new Map();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9Db21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsOERBQTJEO0FBQzNELGdFQUF1QztBQUV2QyxnREFBdUI7QUFFdkIsTUFBcUIsU0FBVSxTQUFRLG9CQUFVO0lBRy9DLFlBQVksT0FBd0I7UUFDbEMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ2QsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN6QyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQ2xDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxVQUFVO1FBQ3RCLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsQ0FBQTtJQUNuQyxDQUFDO0lBRU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFZO1FBQ2xDLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbkMsQ0FBQztJQUVNLGtCQUFrQjtRQUN2QixJQUFJLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQzVDLE1BQU0sS0FBSyxHQUFHLHFCQUFXLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUE7WUFDekQsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsT0FBTyxLQUFLLENBQUE7YUFDYjtZQUNELE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQTtTQUNsRDtRQUNELE9BQU8sRUFBRSxDQUFBO0lBQ1gsQ0FBQztJQUVNLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBd0I7UUFDdkMsT0FBTyxJQUFJLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUMvQixDQUFDO0lBRU0sTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQWM7UUFDM0MsTUFBTSxHQUFHLEdBQUcsU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLEdBQUc7WUFBRSxPQUFPLFNBQVMsQ0FBQTtRQUUxQixNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUE7UUFFOUIsSUFBSSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsSUFBSSxFQUFFO1lBQ2hCLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGNBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtTQUN0RTtRQUVELE9BQU8sU0FBUyxDQUFBO1FBRWhCLHVDQUNLLFNBQVMsR0FDVCxDQUFDLENBQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksS0FBSTtZQUNsQixJQUFJLEVBQUUsR0FBRyxFQUFFLENBQUMsa0RBQU8sTUFBTSxDQUFDLElBQUksSUFBRSxJQUFJLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNyRSxDQUFDLEVBQ0g7SUFDSCxDQUFDO0lBRU0sTUFBTSxDQUFDLGFBQWEsQ0FBQyxFQUFtQixFQUFFLFVBQWlCO1FBQ2hFLE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQ2xDLE1BQU0sVUFBVSxHQUFHLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQTtZQUNoQyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUU7Z0JBQ3pCLFVBQVUsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLGFBQWEsQ0FDN0MsRUFBRSxFQUNGLFVBQVUsQ0FBQyxVQUFVLENBQ3RCLENBQUE7YUFDRjtZQUNELE9BQU8sVUFBVSxDQUFBO1FBQ25CLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQzs7QUFsRUgsNEJBbUVDO0FBbEVrQixnQkFBTSxHQUEyQixJQUFJLEdBQUcsRUFBRSxDQUFBIn0=