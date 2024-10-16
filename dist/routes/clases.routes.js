"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clases_controller_1 = require("../controller/clases.controller");
const routes = (0, express_1.Router)();
/**
 * @swagger
 * tags:
 *   name: Clases
 *   description: Operaciones relacionadas con las clases
 */
/**
 * @swagger
 * /clases:
 *   get:
 *     summary: Obtener todas las clases
 *     tags: [Clases]
 *     responses:
 *       '200':
 *         description: Lista de clases obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClaseDetallada'
 */
routes.get("/clases", clases_controller_1.ClasesController.getAllClases);
/**
 * @swagger
 * /clases:
 *   post:
 *     summary: Crear una nueva clase
 *     tags: [Clases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClaseEntrada'
 *     responses:
 *       '201':
 *         description: Clase creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClaseSalida'
 */
routes.post("/clases", clases_controller_1.ClasesController.createClase);
/**
 * @swagger
 * /clases/{filter}:
 *   get:
 *     summary: Filtrar clases
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: filter
 *         required: true
 *         schema:
 *           type: string
 *         description: Filtro para buscar clases
 *     responses:
 *       '200':
 *         description: Clases filtradas obtenidas exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ClaseDetallada'
 */
routes.get("/clases/:filter", clases_controller_1.ClasesController.filterClass);
/**
 * @swagger
 * /clases/{id}:
 *   delete:
 *     summary: Eliminar una clase
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la clase a eliminar
 *     responses:
 *       '200':
 *         description: Clase eliminada exitosamente
 */
routes.delete("/clases/:id", clases_controller_1.ClasesController.deleteClass);
/**
 * @swagger
 * /clases/{id}:
 *   put:
 *     summary: Actualizar una clase existente
 *     tags: [Clases]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la clase a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ClaseEntrada'
 *     responses:
 *       '200':
 *         description: Clase actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ClaseSalida'
 */
routes.put("/clases/:id", clases_controller_1.ClasesController.updateClass);
/**
 * @swagger
 * components:
 *   schemas:
 *     ClaseEntrada:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Cloud - Computing"
 *         description:
 *           type: string
 *           example: "Opcional"
 *         professor:
 *           type: string
 *           format: uuid
 *           example: "25c4c861-638c-4ad0-aa3b-38ffa1a39bd5"
 *       required:
 *         - name
 *         - professor
 *
 *     ClaseSalida:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "fd7b51df-77cc-4583-87a4-49c34a2ad105"
 *         name:
 *           type: string
 *           example: "Devops"
 *         description:
 *           type: string
 *           example: "Opcional"
 *         professor:
 *           type: string
 *           format: uuid
 *           example: "25c4c861-638c-4ad0-aa3b-38ffa1a39bd5"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-08T22:21:13.774Z"
 *
 *     ClaseDetallada:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "5419e792-5983-448e-80cd-1e9550002378"
 *         name:
 *           type: string
 *           example: "Cloud - Computing"
 *         description:
 *           type: string
 *           example: "Opcional"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-08T22:19:07.954Z"
 *         professor:
 *           $ref: '#/components/schemas/Profesor'
 *         attendances:
 *           type: array
 *           items:
 *             type: object
 *           description: "Lista de asistencias (vacía en el ejemplo)"
 *
 *     Profesor:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "25c4c861-638c-4ad0-aa3b-38ffa1a39bd5"
 *         firstName:
 *           type: string
 *           example: "John"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         email:
 *           type: string
 *           format: email
 *           example: "john.doe@example.com"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2024-09-08T02:54:02.554Z"
 */
exports.default = routes;
