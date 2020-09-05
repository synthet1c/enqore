"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tapAsync = void 0;
/**
 * tapAsync
 *
 * Tap an async function, if no value is returned tap the argument to the next function
 */
exports.tapAsync = (fn) => (x) => fn(x).then((y) => y || x);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFwQXN5bmMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdGFwQXN5bmMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0E7Ozs7R0FJRztBQUNVLFFBQUEsUUFBUSxHQUFHLENBQU0sRUFBNkIsRUFBRSxFQUFFLENBQUMsQ0FDOUQsQ0FBSSxFQUNVLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUEifQ==