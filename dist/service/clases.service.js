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
exports.ClasesService = void 0;
const typeorm_1 = require("typeorm");
const config_1 = __importDefault(require("../database/config"));
const models_1 = require("../models");
class ClasesService {
    constructor() {
        this.clasesRepository = config_1.default.getRepository(models_1.Clases);
    }
    getAllClases() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clasesRepository.find({
                relations: ["professor", "attendances"],
            });
        });
    }
    createClase(dataClasss) {
        return __awaiter(this, void 0, void 0, function* () {
            const newClass = this.clasesRepository.create(dataClasss);
            return yield this.clasesRepository.save(newClass);
        });
    }
    filterClass(filter) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.clasesRepository.find({
                where: {
                    name: (0, typeorm_1.Like)(`%${filter}%`),
                },
            });
        });
    }
    deleteClass(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.clasesRepository.delete({ id });
        });
    }
    updateClass(id, dataClasss) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.clasesRepository.findOne({ where: { id } });
            if (!data)
                return null;
            const updateClass = this.clasesRepository.merge(data, dataClasss);
            return yield this.clasesRepository.save(updateClass);
        });
    }
}
exports.ClasesService = ClasesService;
