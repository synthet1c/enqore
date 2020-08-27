"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertProps = void 0;
const rambda_1 = require("rambda");
exports.convertProps = (converter) => (props) => {
    return Object.entries(converter).reduce((acc, [key, value]) => {
        if (acc[key]) {
            return rambda_1.omit([key], Object.assign(Object.assign({}, acc), { [value]: acc[key] }));
        }
        return acc;
    }, props);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udmVydFByb3BzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL2NvbnZlcnRQcm9wcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBNkI7QUFFaEIsUUFBQSxZQUFZLEdBQUcsQ0FBQyxTQUFjLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUU7SUFDN0QsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sQ0FDckMsQ0FBQyxHQUFRLEVBQUUsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFtQixFQUFFLEVBQUU7UUFDM0MsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDWixPQUFPLGFBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxrQ0FDWixHQUFHLEtBQ04sQ0FBQyxLQUFLLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxDQUFDLElBQ2pCLENBQUE7U0FDSDtRQUNELE9BQU8sR0FBRyxDQUFBO0lBQ1osQ0FBQyxFQUNELEtBQUssQ0FDTixDQUFBO0FBQ0gsQ0FBQyxDQUFBIn0=