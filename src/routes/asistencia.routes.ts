import { Router } from "express";
import { AsistenciaController } from "../controller/asistencia.controller";

const router: Router = Router();

/**
 * @swagger
 * tags:
 *   name: Asistencia
 *   description: API para gestionar la asistencia de estudiantes
 */

/**
 * @swagger
 * /asistencia:
 *   get:
 *     summary: Obtener todas las asistencias
 *     tags: [Asistencia]
 *     responses:
 *       '200':
 *         description: Lista de asistencias
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AsistenciaResponse'
 */
router.get("/asistencia", AsistenciaController.getAllAsistencias);

/**
 * @swagger
 * /asistencia:
 *   post:
 *     summary: Crear una nueva asistencia
 *     tags: [Asistencia]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AsistenciaInput'
 *     responses:
 *       '201':
 *         description: Asistencia creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsistenciaResponse'
 */
router.post("/asistencia", AsistenciaController.createAsistencia);

/**
 * @swagger
 * /asistencia/{id}:
 *   put:
 *     summary: Actualizar una asistencia existente
 *     tags: [Asistencia]
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
 *             $ref: '#/components/schemas/AsistenciaInput'
 *     responses:
 *       '200':
 *         description: Asistencia actualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AsistenciaResponse'
 */
router.put("/asistencia/:id", AsistenciaController.updateAsistencia);

/**
 * @swagger
 * /asistencia/{id}:
 *   delete:
 *     summary: Eliminar una asistencia
 *     tags: [Asistencia]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Asistencia eliminada
 */
router.delete("/asistencia/:id", AsistenciaController.deleteAsistencia);

/**
 * @swagger
 * /asistencia/filter:
 *   get:
 *     summary: Filtrar asistencias
 *     tags: [Asistencia]
 *     responses:
 *       '200':
 *         description: Lista de asistencias filtradas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/AsistenciaResponse'
 */
router.get("/asistencia/filter", AsistenciaController.filterAsistencias);

/**
 * @swagger
 * components:
 *   schemas:
 *     AsistenciaInput:
 *       type: object
 *       properties:
 *         date:
 *           type: string
 *           format: date
 *           example: "23/04/2024"
 *         status:
 *           type: boolean
 *           example: true
 *         classId:
 *           type: string
 *           format: uuid
 *           example: "fd7b51df-77cc-4583-87a4-49c34a2ad105"
 *         studentId:
 *           type: string
 *           format: uuid
 *           example: "2d9e3640-5dfd-4764-95b8-8b213a5f09c3"
 *       required:
 *         - date
 *         - status
 *         - classId
 *         - studentId
 *     AsistenciaResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         date:
 *           type: string
 *           format: date
 *         status:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 *         student:
 *           $ref: '#/components/schemas/Student'
 *         classEntity:
 *           $ref: '#/components/schemas/ClassEntity'
 *     Student:
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
 *           format: email
 *         createdAt:
 *           type: string
 *           format: date-time
 *     ClassEntity:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 */

export default router;
