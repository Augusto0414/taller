"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const asistencia_routes_1 = __importDefault(require("./asistencia.routes"));
const profesor_routes_1 = __importDefault(require("./profesor.routes"));
const estudiante_routes_1 = __importDefault(require("./estudiante.routes"));
const clases_routes_1 = __importDefault(require("./clases.routes"));
const router = (0, express_1.Router)();
router.use(asistencia_routes_1.default);
router.use(profesor_routes_1.default);
router.use(estudiante_routes_1.default);
router.use(clases_routes_1.default);
exports.default = router;
