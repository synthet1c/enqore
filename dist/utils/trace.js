"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trace = void 0;
exports.trace = (tag) => (...xs) => {
    // tslint:disable-next-line:no-console
    console.log(tag, ...xs);
    return xs[0];
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdXRpbHMvdHJhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQWEsUUFBQSxLQUFLLEdBQUcsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsR0FBRyxFQUFTLEVBQUUsRUFBRTtJQUNyRCxzQ0FBc0M7SUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUN2QixPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNkLENBQUMsQ0FBQSJ9