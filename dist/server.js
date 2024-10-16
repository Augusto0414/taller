"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./database/config"));
const app_1 = __importDefault(require("./app"));
const swagger_1 = require("./swagger/swagger");
(() => {
    config_1.default
        .initialize()
        .then(() => console.log("Initialized pool ok!"))
        .catch(() => console.log("Error initialization pool!"));
    (0, swagger_1.SwaggerDoc)(app_1.default);
    app_1.default.listen(app_1.default.get("port"), () => {
        console.log(`Server is running on port ${app_1.default.get("port")}`);
    });
})();
