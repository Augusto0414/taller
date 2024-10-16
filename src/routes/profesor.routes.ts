import { Router } from "express";
import { ProfesorController } from "../controller/profesor.controller";
const router = Router();

/**
 * @swagger
 * /profesor:
 *   post:
 *     summary: Crear un nuevo profesor
 *     tags: [Profesores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ProfesorInput'
 *     responses:
 *       201:
 *         description: Profesor creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesor'
 *       400:
 *         description: Datos de entrada inválidos
 */
router.post("/profesor", ProfesorController.createProfesor);

/**
 * @swagger
 * /profesor:
 *   get:
 *     summary: Obtener todos los profesores
 *     tags: [Profesores]
 *     responses:
 *       200:
 *         description: Lista de profesores obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Profesor'
 */
router.get("/profesor", ProfesorController.getAllProfesores);

/**
 * @swagger
 * /profesor/{id}:
 *   put:
 *     summary: Actualizar un profesor existente
 *     tags: [Profesores]
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
 *             $ref: '#/components/schemas/ProfesorInput'
 *     responses:
 *       200:
 *         description: Profesor actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Profesor'
 *       404:
 *         description: Profesor no encontrado
 */
router.put("/profesor/:id", ProfesorController.updateProfesor);

/**
 * @swagger
 * /profesor/{id}:
 *   delete:
 *     summary: Eliminar un profesor
 *     tags: [Profesores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Profesor eliminado exitosamente
 *       404:
 *         description: Profesor no encontrado
 */
router.delete("/profesor/:id", ProfesorController.deleteProfesor);

/**
 * @swagger
 * components:
 *   schemas:
 *     ProfesorInput:
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
 *     Profesor:
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

export default router;
