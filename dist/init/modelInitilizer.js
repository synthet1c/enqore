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
const path_1 = __importDefault(require("path"));
const db_1 = require("../db");
const globby_1 = __importDefault(require("globby"));
function modelInitializer(initializerConfig) {
    return function ({ app, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield globby_1.default(initializerConfig.files, {
                cwd: path_1.default.join(process.cwd(), './src'),
            });
            const models = yield Promise.all(files.map((filename) => __awaiter(this, void 0, void 0, function* () {
                return ({
                    filename,
                    file: yield db_1.readJSON(filename)(),
                });
            })));
            const instances = models.map(({ filename, file }) => initializerConfig.ctor.of(Object.assign(Object.assign({}, file), { filename })));
            if (typeof initializerConfig.after === 'function') {
                yield initializerConfig.after(app, {
                    files,
                    models,
                    instances,
                });
            }
        });
    };
}
exports.default = modelInitializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxJbml0aWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2luaXQvbW9kZWxJbml0aWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsZ0RBQXVCO0FBQ3ZCLDhCQUFnQztBQUNoQyxvREFBMkI7QUFjM0IsU0FBd0IsZ0JBQWdCLENBQUMsaUJBQW9DO0lBQzNFLE9BQU8sVUFBZ0IsRUFDckIsR0FBRyxHQUNZOztZQUNmLE1BQU0sS0FBSyxHQUFhLE1BQU0sZ0JBQU0sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUU7Z0JBQzVELEdBQUcsRUFBRSxjQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxPQUFPLENBQUM7YUFDdkMsQ0FBQyxDQUFBO1lBRUYsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUM5QixLQUFLLENBQUMsR0FBRyxDQUFDLENBQU8sUUFBZ0IsRUFBRSxFQUFFO2dCQUFDLE9BQUEsQ0FBQztvQkFDckMsUUFBUTtvQkFDUixJQUFJLEVBQUUsTUFBTSxhQUFRLENBQUMsUUFBUSxDQUFDLEVBQUU7aUJBQ2pDLENBQUMsQ0FBQTtjQUFBLENBQUMsQ0FDSixDQUFBO1lBRUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FDbEQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsaUNBQU0sSUFBSSxLQUFFLFFBQVEsSUFBRyxDQUNqRCxDQUFBO1lBRUQsSUFBSSxPQUFPLGlCQUFpQixDQUFDLEtBQUssS0FBSyxVQUFVLEVBQUU7Z0JBQ2pELE1BQU0saUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtvQkFDakMsS0FBSztvQkFDTCxNQUFNO29CQUNOLFNBQVM7aUJBQ1YsQ0FBQyxDQUFBO2FBQ0g7UUFDSCxDQUFDO0tBQUEsQ0FBQTtBQUNILENBQUM7QUEzQkQsbUNBMkJDIn0=