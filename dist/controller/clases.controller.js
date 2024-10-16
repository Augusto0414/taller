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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClasesController = void 0;
const clases_service_1 = require("../service/clases.service");
const clasesService = new clases_service_1.ClasesService();
class ClasesController {
    static getAllClases(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const clases = yield clasesService.getAllClases();
                res.json(clases);
            }
            catch (error) {
                res.status(500).json({ message: "Error al obtener las clases." });
            }
        });
    }
    static createClase(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, description, professor } = req.body;
                if (!name || !professor) {
                    return res.status(400).json({ message: "Los campos 'nombre' y 'professor' son requeridos." });
                }
                const newClase = yield clasesService.createClase({ name, description, professor });
                res.status(201).json(newClase);
            }
            catch (error) {
                res.status(500).json({ message: "Error al crear la clase." });
            }
        });
    }
    static filterClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const filter = req.query.filter;
                if (!filter) {
                    res.status(400).json({ message: "Debe especificar un filtro." });
                    return;
                }
                const clases = yield clasesService.filterClass(filter);
                res.json(clases);
            }
            catch (error) {
                res.status(500).json({ message: "Error al filtrar las clases." });
            }
        });
    }
    static deleteClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield clasesService.deleteClass(id);
                res.status(204).send();
            }
            catch (error) {
                res.status(500).json({ message: "Error al eliminar la clase." });
            }
        });
    }
    static updateClass(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { name, description, professor } = req.body;
                const dataClasss = { name, description, professor };
                const updatedClass = yield clasesService.updateClass(id, dataClasss);
                if (!updatedClass) {
                    res.status(404).json({ message: "Clase no encontrada." });
                    return;
                }
                res.json(updatedClass);
            }
            catch (error) {
                res.status(500).json({ message: "Error al actualizar la clase." });
            }
        });
    }
}
exports.ClasesController = ClasesController;
