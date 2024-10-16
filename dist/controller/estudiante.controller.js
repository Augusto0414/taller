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
exports.EstudianteController = void 0;
const estudiante_service_1 = require("../service/estudiante.service");
const estudianteService = new estudiante_service_1.EstudianteService();
class EstudianteController {
    static createStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { firstName, lastName, email } = req.body;
                if (!firstName || !lastName || !email) {
                    return res.status(400).send({ message: "Todos los campos son requeridos" });
                }
                const newStudent = yield estudianteService.createStudent({ firstName, lastName, email });
                res.status(201).send(newStudent);
            }
            catch (error) {
                console.error("Error al crear estudiante:", error);
                res.status(500).send({ message: "Error al crear al estudiante", error });
            }
        });
    }
    static getAllEstudiantes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const estudiantes = yield estudianteService.getAllEstudiantes();
                res.send(estudiantes);
            }
            catch (error) {
                console.error("Error al obtener estudiantes:", error);
                res.status(500).send({ message: "Error al obtener estudiantes", error });
            }
        });
    }
    static updateStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const { firstName, lastName, email } = req.body;
                if (!firstName || !lastName || !email) {
                    return res.status(400).send({ message: "Todos los campos son requeridos" });
                }
                const updatedStudent = yield estudianteService.updateStudent(id, { firstName, lastName, email });
                res.send(updatedStudent);
            }
            catch (error) {
                console.error("Error al actualizar estudiante:", error);
                res.status(500).send({ message: "Error al actualizar estudiante", error });
            }
        });
    }
    static deleteStudent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield estudianteService.deleteStudent(id);
                res.status(204).send();
            }
            catch (error) {
                console.error("Error al eliminar estudiante:", error);
                res.status(500).send({ message: "Error al eliminar estudiante", error });
            }
        });
    }
}
exports.EstudianteController = EstudianteController;
