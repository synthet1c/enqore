"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rambda_1 = require("rambda");
class Layout {
    constructor(config) {
        // this._config = _config
        this.name = config.name;
        this.description = config.description;
        this.template = config.template;
        this.meta = config.meta;
        this.components = config.components;
        this.fields = config.fields;
        this.initFields();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21vZGVscy9MYXlvdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFLQSxtQ0FBOEI7QUFFOUIsTUFBcUIsTUFBTTtJQVV6QixZQUFZLE1BQVc7UUFDckIseUJBQXlCO1FBQ3pCLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUE7UUFDckMsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFBO1FBQy9CLElBQUksQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQTtRQUN2QixJQUFJLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFBO1FBQzNCLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQTtJQUNuQixDQUFDO0lBRU8sVUFBVTtRQUNoQiw0REFBNEQ7SUFDOUQsQ0FBQztJQUVNLFVBQVUsQ0FBQyxNQUFXO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FDcEMsSUFBSSxDQUFDLFVBQVUsRUFDZixDQUFDLFNBQWMsRUFBRSxFQUFFO1lBQ2pCLElBQUksTUFBTSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3hCLFNBQVMsQ0FBQyxVQUFVLEdBQUcsY0FBSyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtZQUN0RCxPQUFPLFNBQVMsQ0FBQTtRQUNsQixDQUFDLENBQ0YsQ0FBQTtJQUNILENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLFVBQWlCLEVBQUUsS0FBSyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4RCxPQUFPLENBQUMsVUFBVSxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQWMsRUFBRSxFQUFFLENBQUMsaUNBQzdDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FDaEIsVUFBVSxFQUFFLE1BQU0sQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsSUFDMUQsQ0FBQyxDQUFBO0lBQ0wsQ0FBQztDQUNGO0FBMUNELHlCQTBDQyJ9