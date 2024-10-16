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
exports.AsistenciaService = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../database/config"));
const models_1 = require("../models");
class AsistenciaService {
    constructor() {
        this.asistenciaRepository = config_1.default.getRepository(models_1.Asistencia);
    }
    getAllAsistencias() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.asistenciaRepository.find({
                relations: ["student", "classEntity"],
            });
        });
    }
    createAsistencia(dataAsistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            const newAsistencia = this.asistenciaRepository.create(dataAsistencia);
            return yield this.asistenciaRepository.save(newAsistencia);
        });
    }
    filterAsistencia(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.asistenciaRepository.find({
                where: [
                    {
                        student: {
                            firstName: (0, typeorm_1.Like)(`%${filter}%`),
                        },
                    },
                    {
                        classEntity: {
                            name: (0, typeorm_1.Like)(`%${filter}%`),
                        },
                    },
                    {
                        date: (0, typeorm_1.Like)(`%${filter}%`),
                    },
                ],
                relations: ["student", "classEntity"],
            });
        });
    }
    deleteAsistencia(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.asistenciaRepository.delete({ id });
        });
    }
    updateAsistencia(id, dataAsistencia) {
        return __awaiter(this, void 0, void 0, function* () {
            const asistencia = yield this.asistenciaRepository.findOne({
                where: { id },
                relations: ["student", "classEntity"],
            });
            if (!asistencia)
                return null;
            this.asistenciaRepository.merge(asistencia, dataAsistencia);
            return yield this.asistenciaRepository.save(asistencia);
        });
    }
}
exports.AsistenciaService = AsistenciaService;
