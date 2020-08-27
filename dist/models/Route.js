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
const readFile_1 = __importDefault(require("../utils/readFile"));
const Controller_1 = __importDefault(require("./Controller"));
const Field_1 = __importDefault(require("./Field"));
const utils_1 = require("../utils");
const graphql_1 = require("graphql");
const Base_1 = __importDefault(require("./Base"));
const rambda_1 = require("rambda");
const omitPrivates = rambda_1.omit(['_cache', '_schema']);
class Route extends Base_1.default {
    constructor(config, parent) {
        super(config);
        this['constructor'] = Route;
        this.onRoute = (req, res) => {
            console.log('Route::onRoute', this);
            const convertProps = (converter) => (props) => {
                return Object.entries(converter).reduce((acc, [key, value]) => {
                    if (acc[key]) {
                        return rambda_1.omit([key], Object.assign(Object.assign({}, acc), { [value]: acc[key] }));
                    }
                    return acc;
                }, props);
            };
            if (this.controller.query) {
                graphql_1.graphql(utils_1.trace('graphQlQuery')({
                    schema: this.schema,
                    source: this.controller.query,
                    variableValues: convertProps(this.params)(req.params),
                }))
                    .then((response) => {
                    console.log('response', response);
                    this.data = response.data;
                    res.json({
                        params: req.params,
                        // blocks: this.controller.blocks,
                        layout: this.controller.layout,
                        fields: this.controller.fields,
                        data: response.data,
                    });
                })
                    .catch(utils_1.trace('error'));
            }
            else {
                res.json({
                    params: req.params,
                    // blocks: this.controller.blocks,
                    layout: this.controller.layout,
                    fields: this.controller.fields,
                });
            }
        };
        // this._config = config
        this.parent = parent;
        this.file = parent.file;
        this.url = Route.convertUrl(config.url);
        this.params = config.params;
        this.get = config.get;
        this.controller = new Controller_1.default(readFile_1.default(config.controller), this);
        this.fields = Field_1.default.evaluate(Object.assign(Object.assign(Object.assign({}, config.fields), this.controller.layout.fields), this.controller.fields));
    }
    getData() {
        if (this.controller.data) {
            // this.query = readFile()
        }
    }
    init(app, parent, schema) {
        return __awaiter(this, void 0, void 0, function* () {
            this._schema = schema;
            this.parent = parent;
            return this.controller.init(this).then((x) => {
                app.get(parent.url + this.url, this.onRoute);
                return x;
            });
        });
    }
    static convertUrl(url) {
        return url.replace(/{(\w+)(?::(\w+))?}/gim, (_, name, type) => {
            switch (type) {
                case 'int':
                    return `:${name}(\d+)`;
                case 'string':
                    return `:${name}`;
            }
            return `:${name}`;
        });
    }
}
exports.default = Route;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQXdDO0FBQ3hDLDhEQUFxQztBQUdyQyxvREFBMkI7QUFDM0Isb0NBQTRDO0FBQzVDLHFDQUFnRDtBQUloRCxrREFBeUM7QUFDekMsbUNBQTZCO0FBRTdCLE1BQU0sWUFBWSxHQUFHLGFBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBRWhELE1BQXFCLEtBQU0sU0FBUSxjQUFJO0lBaUJyQyxZQUFZLE1BQW1CLEVBQUUsTUFBVztRQUMxQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFqQmYsS0FBQyxhQUFhLENBQUMsR0FBRyxLQUFLLENBQUE7UUFzQ2YsWUFBTyxHQUFHLENBQUMsR0FBWSxFQUFFLEdBQWEsRUFBRSxFQUFFO1lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUE7WUFFbkMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxTQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7Z0JBQ3RELE9BQU8sTUFBTSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxNQUFNLENBQ3JDLENBQUMsR0FBUSxFQUFFLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBbUIsRUFBRSxFQUFFO29CQUMzQyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRTt3QkFDWixPQUFPLGFBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQ0FDWixHQUFHLEtBQ04sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQ2pCLENBQUE7cUJBQ0g7b0JBQ0QsT0FBTyxHQUFHLENBQUE7Z0JBQ1osQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFBO1lBQ0gsQ0FBQyxDQUFBO1lBRUQsSUFBSSxJ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