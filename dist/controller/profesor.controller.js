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
exports.ProfesorController = void 0;
const profesor_service_1 = require("../service/profesor.service");
const profesorService = new profesor_service_1.ProfesorService();
class ProfesorController {
    static createProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email } = req.body;
                if (!firstName || !lastName || !email) {
                    return res.status(400).send({ message: "Todos los campos son requeridos" });
                }
                const newProfesor = yield profesorService.createProfesor({ firstName, lastName, email });
                res.status(201).send(newProfesor);
            }
            catch (error) {
                console.error("Error al crear profesor: ", error);
                res.status(500).send({ message: "Error inesperado en el backend" });
            }
        });
    }
    static getAllProfesores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const profesores = yield profesorService.getAllProfesores();
                res.send(profesores);
            }
            catch (error) {
                console.error("Error al obtener profesores: ", error);
                res.status(500).send({ message: "Error inesperado en el backend" });
            }
        });
    }
    static updateProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { firstName, lastName, email } = req.body;
                const updatedProfesor = yield profesorService.updateProfesor(id, { firstName, lastName, email });
                if (!updatedProfesor) {
                    res.status(404).send({ message: "Profesor no encontrado" });
                    return;
                }
                res.send(updatedProfesor);
            }
            catch (error) {
                console.error("Error al actualizar profesor: ", error);
                res.status(500).send({ message: "Error inesperado en el backend" });
            }
        });
    }
    static deleteProfesor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield profesorService.deleteProfesor(id);
                res.status(204).send();
            }
            catch (error) {
                console.error("Error al eliminar profesor: ", error);
                res.status(500).send({ message: "Error inesperado en el backend" });
            }
        });
    }
}
exports.ProfesorController = ProfesorController;
