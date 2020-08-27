"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Field_1 = __importDefault(require("../models/Field"));
const modelInitilizer_1 = __importDefault(require("./modelInitilizer"));
exports.default = modelInitilizer_1.default({
    files: ['fields/*.json', '!fields/fields.json', '!fields/_lock.json'],
    ctor: Field_1.default,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luaXQvZmllbGRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1DO0FBQ25DLHdFQUFnRDtBQUVoRCxrQkFBZSx5QkFBZ0IsQ0FBQztJQUM5QixLQUFLLEVBQUUsQ0FBQyxlQUFlLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLENBQUM7SUFDckUsSUFBSSxFQUFFLGVBQUs7Q0FDWixDQUFDLENBQUEifQ==