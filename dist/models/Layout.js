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
const rambda_1 = require("rambda");
const Base_1 = __importDefault(require("./Base"));
class Layout extends Base_1.default {
    constructor(config) {
        super(config);
        this['constructor'] = Layout;
        // this._config = _config
        this.name = config.name;
        this.description = config.description;
        this.template = config.template;
        this.meta = config.meta;
        this.components = config.components;
        this.fields = config.fields;
        this.initFields();
    }
    init(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            this.parent = parent;
        });
    }
    initFields() {
        // this._config.fields.map((field: any) => new Field(field))
    }
    initBlocks(blocks) {
        this.components = Layout.mapComponents(this.components, (component) => {
            if (blocks[component.name])
                component.components = rambda_1.clone(blocks[component.name]);
            return component;
        });
    }
    static mapComponents(components, fn = (x) => x) {
        return (components || []).map((component) => (Object.assign(Object.assign({}, fn(component)), { components: Layout.mapComponents(component.components, fn) })));
    }
}
exports.default = Layout;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9MYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFLQSxtQ0FBOEI7QUFDOUIsa0RBQXlCO0FBRXpCLE1BQXFCLE1BQU8sU0FBUSxjQUFJO0lBV3RDLFlBQVksTUFBVztRQUNyQixLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFYZixLQUFDLGFBQWEsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtRQVl0Qix5QkFBeUI7UUFDekIsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQTtRQUNyQyxJQUFJLENBQUMsUUFBUSxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUE7UUFDL0IsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQTtRQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDM0IsSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFBO0lBQ25CLENBQUM7SUFFWSxJQUFJLENBQUMsTUFBWTs7WUFDNUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDdEIsQ0FBQztLQUFBO0lBRU8sVUFBVTtRQUNoQiw0REFBNEQ7SUFDOUQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxNQUFXO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FDcEMsSUFBSSxDQUFDLFVBQVUsRUFDZixDQUFDLFNBQWMsRUFBRSxFQUFFO1lBQ2pCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsY0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN0RCxPQUFPLFNBQVMsQ0FBQTtRQUNsQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQWlCLEVBQUUsS0FBSyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFLENBQUMsaUNBQzdDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FDaEIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFDMUQsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNGO0FBaERELHlCQWdEQyJ9