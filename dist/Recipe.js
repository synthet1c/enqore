"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const type_graphql_1 = require("type-graphql");
const Arg_1 = require("type-graphql/dist/decorators/Arg");
const db_1 = require("./db");
let Recipe = class Recipe {
};
__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    __metadata("design:type", Number)
], Recipe.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    __metadata("design:type", String)
], Recipe.prototype, "name", void 0);
Recipe = __decorate([
    type_graphql_1.ObjectType()
], Recipe);
let RecipeResolver = class RecipeResolver {
    constructor(recipeService) {
        this.recipeService = recipeService;
    }
    recipe(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const recipe = yield db_1.db.test.find({ id });
            if (!recipe)
                throw new Error(`Recipe not found: ${id}`);
            return recipe;
        });
    }
    recipes() {
        return __awaiter(this, void 0, void 0, function* () {
            return db_1.db.test.read();
        });
    }
};
__decorate([
    type_graphql_1.Query((returns) => Recipe),
    __param(0, Arg_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipe", null);
__decorate([
    type_graphql_1.Query(returns => [Recipe]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipes", null);
RecipeResolver = __decorate([
    type_graphql_1.Resolver(Recipe),
    __metadata("design:paramtypes", [typeof (_a = typeof RecipeService !== "undefined" && RecipeService) === "function" ? _a : Object])
], RecipeResolver);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVjaXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL1JlY2lwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSwrQ0FBcUU7QUFDckUsMERBQXNEO0FBQ3RELDZCQUFpQztBQUdqQyxJQUFNLE1BQU0sR0FBWixNQUFNLE1BQU07Q0FNWCxDQUFBO0FBSkM7SUFEQyxvQkFBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsaUJBQUUsQ0FBQzs7a0NBQ1I7QUFHVjtJQURDLG9CQUFLLEVBQUU7O29DQUNJO0FBTFIsTUFBTTtJQURYLHlCQUFVLEVBQUU7R0FDUCxNQUFNLENBTVg7QUFHRCxJQUFNLGNBQWMsR0FBcEIsTUFBTSxjQUFjO0lBQ2xCLFlBQW9CLGFBQTRCO1FBQTVCLGtCQUFhLEdBQWIsYUFBYSxDQUFlO0lBQUcsQ0FBQztJQUc5QyxNQUFNLENBQVksRUFBVTs7WUFDaEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxPQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUE7WUFDekMsSUFBSSxDQUFDLE1BQU07Z0JBQUUsTUFBTSxJQUFJLEtBQUssQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQTtZQUN2RCxPQUFPLE1BQU0sQ0FBQTtRQUNmLENBQUM7S0FBQTtJQUdLLE9BQU87O1lBQ1gsT0FBTyxPQUFFLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3ZCLENBQUM7S0FBQTtDQUNGLENBQUE7QUFWQztJQURDLG9CQUFLLENBQUMsQ0FBQyxPQUFZLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQztJQUNsQixXQUFBLFNBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTs7Ozs0Q0FJdEI7QUFHRDtJQURDLG9CQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDOzs7OzZDQUcxQjtBQWJHLGNBQWM7SUFEbkIsdUJBQVEsQ0FBQyxNQUFNLENBQUM7eURBRW9CLGFBQWEsb0JBQWIsYUFBYTtHQUQ1QyxjQUFjLENBY25CIn0=