"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Route_1 = __importDefault(require("../models/Route"));
const modelInitilizer_1 = __importDefault(require("./modelInitilizer"));
exports.default = modelInitilizer_1.default({
    files: ['**/*/*.route.json'],
    ctor: Route_1.default,
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luaXQvcm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsNERBQW1DO0FBQ25DLHdFQUFnRDtBQUVoRCxrQkFBZSx5QkFBZ0IsQ0FBQztJQUM5QixLQUFLLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztJQUM1QixJQUFJLEVBQUUsZUFBSztDQUNaLENBQUMsQ0FBQSJ9