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
const Layout_1 = __importDefault(require("./Layout"));
const readFile_1 = __importDefault(require("../utils/readFile"));
const File_1 = __importDefault(require("./File"));
class Controller extends File_1.default {
    constructor(config, parent) {
        super(config);
        this['constructor'] = Controller;
        this.parent = parent;
        this.blocks = config.blocks;
        this.fields = config.fields;
        this.queryFile = config.data;
        this.key = config.key;
        this.layout = new Layout_1.default(readFile_1.default(config.layout));
        this.meta = config.meta;
        this.name = config.name;
        this.params = config.params;
        this.template = config.template;
        this.getQuery();
        this.initLayout();
    }
    init(parent) {
        return __awaiter(this, void 0, void 0, function* () {
            this.parent = parent;
            return this.layout.init(this);
        });
    }
    getQuery() {
        if (this.queryFile) {
            this.readTextFile(this.queryFile)
                .then((file) => {
                this.query = file;
            })
                .catch((e) => {
                // console.log('Unable to load file', this.queryFile, e)
            });
        }
    }
    initLayout() {
        this.layout.initBlocks(this.blocks);
    }
}
exports.default = Controller;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9tb2RlbHMvQ29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBLHNEQUE2QjtBQUM3QixpRUFBd0M7QUFJeEMsa0RBQXlCO0FBRXpCLE1BQXFCLFVBQVcsU0FBUSxjQUFJO0lBZ0IxQyxZQUFZLE1BQVcsRUFBRSxNQUFZO1FBQ25DLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQWhCZixLQUFDLGFBQWEsQ0FBQyxHQUFHLFVBQVUsQ0FBQTtRQWlCMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUE7UUFDcEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQTtRQUMzQixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUE7UUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxNQUFNLENBQUMsR0FBRyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBTSxDQUFDLGtCQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUE7UUFDM0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQy9CLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQTtRQUNmLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRVksSUFBSSxDQUFDLE1BQVk7O1lBQzVCLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFBO1lBQ3BCLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDL0IsQ0FBQztLQUFBO0lBRU8sUUFBUTtRQUNkLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRTtZQUNsQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7aUJBQzlCLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNiLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFBO1lBQ25CLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtnQkFDaEIsd0RBQXdEO1lBQzFELENBQUMsQ0FBQyxDQUFBO1NBQ0w7SUFDSCxDQUFDO0lBRU8sVUFBVTtRQUNoQixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7SUFDckMsQ0FBQztDQUNGO0FBcERELDZCQW9EQyJ9