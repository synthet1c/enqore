"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.evalObject = exports.evalGetters = exports.createEvalGetters = void 0;
const rambda_1 = require("rambda");
exports.createEvalGetters = (obj) => Object.keys(obj).reduce((acc, key) => {
    const value = obj[key];
    if (typeof value === 'string') {
        const reg = /\${([a-z.]+)}/gim;
        const match = value.replace(reg, '$1');
        if (match) {
            if (value === '${' + match + '}') {
                // single interpolation property in the string "${something}"
                acc[key] = rambda_1.path(match);
            }
            else {
                // multiple interpolation properties in the string "stuff ${something} other stuff"
                const replaced = value
                    .replace(reg, (_, match) => {
                    const propGetter = match.split('.').reduce(({ acc, cache }, x, i) => {
                        return {
                            acc: acc.concat(([...cache, x]).join('.')),
                            cache: cache.concat(x)
                        };
                    }, { acc: [], cache: ['props'] });
                    return '${(' + propGetter.acc.join(' && ') + ') ? ' + propGetter.acc.pop() + ' : ""}';
                });
                console.log('replaced', replaced);
                // .replace(
                //   reg,
                //   '${~["string", "number"].indexOf(typeof(props?.$1)) ? props.$1 : ""}'
                // )
                acc[key] = new Function('props', 'return `' + replaced + '`');
            }
        }
        else {
            // non interpolated value
            acc[key] = rambda_1.always(value);
        }
    }
    else {
        // non interpolated value
        acc[key] = rambda_1.always(value);
    }
    return acc;
}, {});
exports.evalGetters = (evalGetters) => (evalProps) => Object.keys(evalGetters).reduce((acc, key) => (Object.assign(Object.assign({}, acc), { [key]: evalGetters[key](evalProps) })), {});
exports.evalObject = (obj) => exports.evalGetters(exports.createEvalGetters(obj));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbE9iamVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9ldmFsT2JqZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUEyQztBQUc5QixRQUFBLGlCQUFpQixHQUFHLENBQUMsR0FBZSxFQUFlLEVBQUUsQ0FDaEUsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFlLEVBQUUsR0FBVyxFQUFFLEVBQUU7SUFDdkQsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO0lBQ3RCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1FBQzdCLE1BQU0sR0FBRyxHQUFHLGtCQUFrQixDQUFBO1FBQzlCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFBO1FBQ3RDLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssR0FBRyxHQUFHLEVBQUU7Z0JBQ2hDLDZEQUE2RDtnQkFDN0QsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLGFBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTthQUN2QjtpQkFBTTtnQkFDTCxtRkFBbUY7Z0JBQ25GLE1BQU0sUUFBUSxHQUFHLEtBQUs7cUJBQ25CLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFTLEVBQUUsS0FBYSxFQUFFLEVBQUU7b0JBQ3pDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUErQixFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsRUFBRTt3QkFDL0csT0FBTzs0QkFDTCxHQUFHLEVBQUUsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7NEJBQzFDLEtBQUssRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzt5QkFDdkIsQ0FBQTtvQkFDSCxDQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQTtvQkFDakMsT0FBTyxLQUFLLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsTUFBTSxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsUUFBUSxDQUFBO2dCQUN2RixDQUFDLENBQUMsQ0FBQTtnQkFDSixPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQTtnQkFDakMsWUFBWTtnQkFDWixTQUFTO2dCQUNULDBFQUEwRTtnQkFDMUUsSUFBSTtnQkFDSixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxRQUFRLEdBQUcsR0FBRyxDQUFDLENBQUE7YUFDOUQ7U0FDRjthQUFNO1lBQ0wseUJBQXlCO1lBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDekI7S0FDRjtTQUFNO1FBQ0wseUJBQXlCO1FBQ3pCLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7S0FDekI7SUFDRCxPQUFPLEdBQUcsQ0FBQTtBQUNaLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQTtBQUVLLFFBQUEsV0FBVyxHQUFHLENBQUMsV0FBd0IsRUFBRSxFQUFFLENBQUMsQ0FDdkQsU0FBb0IsRUFDcEIsRUFBRSxDQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsTUFBTSxDQUM3QixDQUFDLEdBQWMsRUFBRSxHQUFXLEVBQUUsRUFBRSxDQUFDLGlDQUM1QixHQUFHLEtBQ04sQ0FBQyxHQUFHLENBQUMsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQ2xDLEVBQ0YsRUFBRSxDQUNILENBQUE7QUFFVSxRQUFBLFVBQVUsR0FBRyxDQUFDLEdBQWUsRUFBRSxFQUFFLENBQzVDLG1CQUFXLENBQUMseUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSJ9