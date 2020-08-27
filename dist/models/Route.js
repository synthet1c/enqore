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
const Module_1 = __importDefault(require("./Module"));
const Field_1 = __importDefault(require("./Field"));
const utils_1 = require("../utils");
const graphql_1 = require("graphql");
const Base_1 = __importDefault(require("./Base"));
const rambda_1 = require("rambda");
const Component_1 = __importDefault(require("./Component"));
const omitPrivates = rambda_1.omit(['_cache', '_schema']);
class Route extends Base_1.default {
    constructor(config, parent) {
        super(config);
        this['constructor'] = Route;
        this.onRoute = (req, res) => {
            console.log('Route::onRoute', this);
            const data = {
                page: {
                    title: 'This is the title',
                    description: 'this is the description',
                    number: 1337,
                },
                theme: {
                    primary: '#3cf',
                },
            };
            return Promise.resolve(data)
                .then((data) => {
                if (!this.controller.query)
                    return data;
                return graphql_1.graphql(utils_1.trace('graphQlQuery')({
                    schema: this.schema,
                    source: this.controller.query,
                    variableValues: utils_1.convertProps(this.params)(req.params),
                }))
                    .then((response) => (Object.assign(Object.assign({}, data), response.data)))
                    .catch(utils_1.trace('error'));
            })
                .then(rambda_1.tap((data) => {
                console.log('response', data);
                this.data = data;
                res.json(this.createResponse(data, req));
            }));
        };
        // this._config = config
        this.parent = parent;
        this.file = parent.file;
        this.origUrl = config.url;
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
    createResponse(data, req) {
        console.log('createResponse', data);
        const modules = Array.from(Module_1.default.entries()).map(([key, module]) => {
            return {
                url: module.url,
                routes: module.routes.map((route) => route.url)
            };
        });
        return {
            params: req.params,
            blocks: Object.keys(this.controller.blocks),
            modules,
            // layout: this.controller.layout,
            fields: this.controller.fields,
            components: Component_1.default.mapComponents((component) => {
                if (component.fields) {
                    component.fields = utils_1.evalObject(component.fields)(data);
                }
                if (component.params) {
                    component.params = utils_1.evalObject(component.params)(data);
                }
                return component;
            }, this.controller.layout.components),
            meta: utils_1.evalObject(this.controller.layout.meta)(data),
            data,
        };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQXdDO0FBQ3hDLDhEQUFxQztBQUNyQyxzREFBNkI7QUFFN0Isb0RBQTJCO0FBQzNCLG9DQUEwRDtBQUMxRCxxQ0FBZ0Q7QUFJaEQsa0RBQXlDO0FBQ3pDLG1DQUFrQztBQUNsQyw0REFBbUM7QUFFbkMsTUFBTSxZQUFZLEdBQUcsYUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFFaEQsTUFBcUIsS0FBTSxTQUFRLGNBQUk7SUFrQnJDLFlBQVksTUFBbUIsRUFBRSxNQUFXO1FBQzFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQWxCZixLQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQXdDZixZQUFPLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUVuQyxNQUFNLElBQUksR0FBRztnQkFDWCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsV0FBVyxFQUFFLHlCQUF5QjtvQkFDdEMsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjthQUNGLENBQUE7WUFFRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2lCQUN6QixJQUFJLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSztvQkFBRSxPQUFPLElBQUksQ0FBQTtnQkFFdkMsT0FBTyxpQkFBTyxDQUNaLGFBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztvQkFDcEIsTUFBTSxFQUFFLElB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