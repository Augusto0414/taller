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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EstudianteService = void 0;
const models_1 = require("../models");
const config_1 = __importDefault(require("../database/config"));
class EstudianteService {
    constructor() {
        this.estudianteRepository = config_1.default.getRepository(models_1.Estudiante);
    }
    getAllEstudiantes() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.estudianteRepository.find();
        });
    }
    createStudent(student) {
        return __awaiter(this, void 0, void 0, function* () {
            const newStudent = this.estudianteRepository.create(student);
            return yield this.estudianteRepository.save(newStudent);
        });
    }
    updateStudent(id, student) {
        return __awaiter(this, void 0, void 0, function* () {
            const existingStudent = yield this.estudianteRepository.findOne({ where: { id } });
            if (!existingStudent) {
                throw new Error("Estudiante no encontrado");
            }
            const updatedStudent = this.estudianteRepository.merge(existingStudent, student);
            return yield this.estudianteRepository.save(updatedStudent);
        });
    }
    deleteStudent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.estudianteRepository.delete({ id });
            if (result.affected === 0) {
                throw new Error("Estudiante no encontrado o no pudo ser eliminado");
            }
        });
    }
}
exports.EstudianteService = EstudianteService;
