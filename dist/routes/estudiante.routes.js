"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const estudiante_controller_1 = require("../controller/estudiante.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /estudiante:
 *   post:
 *     summary: Crear un nuevo estudiante
 *     tags: [Estudiantes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudianteInput'
 *     responses:
 *       201:
 *         description: Estudiante creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post("/estudiante", estudiante_controller_1.EstudianteController.createStudent);
/**
 * @swagger
 * /estudiante:
 *   get:
 *     summary: Obtener todos los estudiantes
 *     tags: [Estudiantes]
 *     responses:
 *       200:
 *         description: Lista de estudiantes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Estudiante'
 */
router.get("/estudiante", estudiante_controller_1.EstudianteController.getAllEstudiantes);
/**
 * @swagger
 * /estudiante/{id}:
 *   put:
 *     summary: Actualizar un estudiante existente
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EstudianteInput'
 *     responses:
 *       200:
 *         description: Estudiante actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Estudiante'
 *       404:
 *         description: Estudiante no encontrado
 */
router.put("/estudiante/:id", estudiante_controller_1.EstudianteController.updateStudent);
/**
 * @swagger
 * /estudiante/{id}:
 *   delete:
 *     summary: Eliminar un estudiante
 *     tags: [Estudiantes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Estudiante eliminado exitosamente
 *       404:
 *         description: Estudiante no encontrado
 */
router.delete("/estudiante/:id", estudiante_controller_1.EstudianteController.deleteStudent);
/**
 * @swagger
 * components:
 *   schemas:
 *     EstudianteInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *       required:
 *         - firstName
 *         - lastName
 *         - email
 *     Estudiante:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *       required:
 *         - id
 *         - firstName
 *         - lastName
 *         - email
 *         - createdAt
 */
exports.default = router;
