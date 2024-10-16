"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerDoc = exports.swaggerSetup = exports.swaggerOptions = void 0;
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
exports.swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Mi API",
            version: "1.0.0",
            description: "Documentación API RESTful",
            contact: {
                name: "Soporte API",
                url: "https://www.instagram.com/augusto0414/",
            },
        },
    },
    apis: ["./src/routes/*.ts"],
};
const swaggerSetup = () => {
    return (0, swagger_jsdoc_1.default)(exports.swaggerOptions);
};
exports.swaggerSetup = swaggerSetup;
const SwaggerDoc = (app) => {
    const swaggerSpec = (0, exports.swaggerSetup)();
    app.use("/api/v1/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
    app.get("/api/v1/docs.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });
};
exports.SwaggerDoc = SwaggerDoc;
