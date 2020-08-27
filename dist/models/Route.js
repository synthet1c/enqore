"use strict";
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
                        data: response.data
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
    init(app, module, schema) {
        this._schema = schema;
        app.get(module.url + this.url, this.onRoute);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUVBQXdDO0FBQ3hDLDhEQUFxQztBQUdyQyxvREFBMkI7QUFDM0Isb0NBQTRDO0FBQzVDLHFDQUFnRDtBQUloRCxrREFBeUM7QUFDekMsbUNBQTZCO0FBRTdCLE1BQU0sWUFBWSxHQUFHLGFBQUksQ0FBQyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFBO0FBRWhELE1BQXFCLEtBQU0sU0FBUSxjQUFJO0lBaUJyQyxZQUFZLE1BQW1CLEVBQUUsTUFBVztRQUMxQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUE7UUFIZixLQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQXdCZixZQUFPLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUVuQyxNQUFNLFlBQVksR0FBRyxDQUFDLFNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRTtnQkFDdEQsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQW1CLEVBQUUsRUFBRTtvQkFDbkYsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ1osT0FBTyxhQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsa0NBQ1osR0FBRyxLQUNOLENBQUMsS0FBSyxDQUFDLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUNqQixDQUFBO3FCQUNIO29CQUNELE9BQU8sR0FBRyxDQUFBO2dCQUNaLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQTtZQUNYLENBQUMsQ0FBQTtZQUVELElBQUksSUFBSSxDQUFDLFVB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