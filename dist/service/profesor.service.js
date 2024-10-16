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
exports.ProfesorService = void 0;
const models_1 = require("../models");
const config_1 = __importDefault(require("../database/config"));
class ProfesorService {
    constructor() {
        this.profesorRepository = config_1.default.getRepository(models_1.Profesor);
    }
    getAllProfesores() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.profesorRepository.find();
        });
    }
    createProfesor(dataProfesor) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProfesor = this.profesorRepository.create(dataProfesor);
            return yield this.profesorRepository.save(newProfesor);
        });
    }
    updateProfesor(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const profesorToUpdate = yield this.profesorRepository.findOne({ where: { id } });
            if (!profesorToUpdate) {
                throw new Error("Profesor no encontrado");
            }
            const updatedProfesor = this.profesorRepository.merge(profesorToUpdate, data);
            return yield this.profesorRepository.save(updatedProfesor);
        });
    }
    deleteProfesor(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.profesorRepository.delete({ id });
            if (result.affected === 0) {
                throw new Error("Profesor no encontrado o no pudo ser eliminado");
            }
        });
    }
}
exports.ProfesorService = ProfesorService;
