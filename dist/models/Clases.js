"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Clases = void 0;
const typeorm_1 = require("typeorm");
const Profesor_1 = require("./Profesor");
const Asistencia_1 = require("./Asistencia");
let Clases = class Clases {
};
exports.Clases = Clases;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Clases.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "varchar", length: 100 }),
    __metadata("design:type", String)
], Clases.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Clases.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Profesor_1.Profesor, (professor) => professor.classes, { onDelete: "CASCADE" }),
    __metadata("design:type", Profesor_1.Profesor)
], Clases.prototype, "professor", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Asistencia_1.Asistencia, (attendance) => attendance.classEntity),
    __metadata("design:type", Array)
], Clases.prototype, "attendances", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: "timestamp" }),
    __metadata("design:type", Date)
], Clases.prototype, "createdAt", void 0);
exports.Clases = Clases = __decorate([
    (0, typeorm_1.Entity)("clases")
], Clases);
