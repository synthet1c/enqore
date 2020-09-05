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
            return Promise.all([
                this.Db.collection('users').findOne({}),
                data
            ])
                .then(([user, data]) => (Object.assign(Object.assign({}, data), { user })))
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
    init(app, parent, schema, Db) {
        return __awaiter(this, void 0, void 0, function* () {
            this._schema = schema;
            this.parent = parent;
            this.Db = Db;
            return this.controller.init(this).then(rambda_1.tap((x) => {
                app.get(parent.url + this.url, this.onRoute);
            }));
        });
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
                routes: module.routes.map((route) => route.url),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm91dGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvbW9kZWxzL1JvdXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaUVBQXdDO0FBQ3hDLDhEQUFxQztBQUNyQyxzREFBNkI7QUFFN0Isb0RBQTJCO0FBQzNCLG9DQUEwRDtBQUMxRCxxQ0FBZ0Q7QUFJaEQsa0RBQXlDO0FBQ3pDLG1DQUFrQztBQUNsQyw0REFBbUM7QUFHbkMsTUFBTSxZQUFZLEdBQUcsYUFBSSxDQUFDLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUE7QUFFaEQsTUFBcUIsS0FBTSxTQUFRLGNBQUk7SUFtQnJDLFlBQVksTUFBbUIsRUFBRSxNQUFXO1FBQzFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQW5CZixLQUFDLGFBQWEsQ0FBQyxHQUFHLEtBQUssQ0FBQTtRQXlEZixZQUFPLEdBQUcsQ0FBQyxHQUFZLEVBQUUsR0FBYSxFQUFFLEVBQUU7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsQ0FBQTtZQUVuQyxNQUFNLElBQUksR0FBRztnQkFDWCxJQUFJLEVBQUU7b0JBQ0osS0FBSyxFQUFFLG1CQUFtQjtvQkFDMUIsV0FBVyxFQUFFLHlCQUF5QjtvQkFDdEMsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFO29CQUNMLE9BQU8sRUFBRSxNQUFNO2lCQUNoQjthQUNGLENBQUE7WUFFRCxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUM7Z0JBQ2pCLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUk7YUFDTCxDQUFDO2lCQUNDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQ0FDbkIsSUFBSSxLQUNQLElBQUks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