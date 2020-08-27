"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const rambda_1 = require("rambda");
const VirtualFile_1 = __importDefault(require("./VirtualFile"));
class Extendable extends VirtualFile_1.default {
    constructor(_config) {
        super(_config);
        // this.__defaultConfig = _config
        this._config = _config;
        if (typeof _config.extends === 'string') {
            this._config = this.extendConfig();
        }
    }
    getConfig() {
        return this._config;
    }
    extendConfig() {
        return rambda_1.mergeAll(this.getExtensionsArray());
    }
    /**
     * get the objects to be extended ordered oldest to newest
     */
    getExtensionsArray() {
        let extendable = this;
        const extensions = [this.getConfig()];
        // @ts-ignore
        while ((extendable = extendable.getExtensionObject())) {
            if (extendable) {
                extensions.unshift(extendable.getConfig());
            }
        }
        return extensions;
    }
}
exports.default = Extendable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXh0ZW5kYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvRXh0ZW5kYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLG1DQUFpQztBQUNqQyxnRUFBdUM7QUFFdkMsTUFBOEIsVUFBVyxTQUFRLHFCQUFXO0lBSTFELFlBQXNCLE9BQXlCO1FBQzdDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNkLGlDQUFpQztRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQTtRQUN0QixJQUFJLE9BQU8sT0FBTyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDdkMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUE7U0FDbkM7SUFDSCxDQUFDO0lBRU0sU0FBUztRQUNkLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRU0sWUFBWTtRQUNqQixPQUFPLGlCQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0lBRUQ7O09BRUc7SUFDSyxrQkFBa0I7UUFDeEIsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFBO1FBQ3JCLE1BQU0sVUFBVSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUE7UUFDckMsYUFBYTtRQUNiLE9BQU8sQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLGtCQUFrQixFQUFFLENBQUMsRUFBRTtZQUNyRCxJQUFJLFVBQVUsRUFBRTtnQkFDZCxVQUFVLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFBO2FBQzNDO1NBQ0Y7UUFDRCxPQUFPLFVBQVUsQ0FBQTtJQUNuQixDQUFDO0NBQ0Y7QUFuQ0QsNkJBbUNDIn0=