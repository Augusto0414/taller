import { Request, Response } from "express";

import pool from "../database/config";
import { Clases, Estudiante } from "../models";
import { AsistenciaService } from "../service/asistencia.service";

const asistenciaService = new AsistenciaService();

export class AsistenciaController {
  static async getAllAsistencias(req: Request, res: Response): Promise<any> {
    try {
      const asistencias = await asistenciaService.getAllAsistencias();
      res.json(asistencias);
    } catch (error) {
      console.error("Error al obtener asistencias: ", error);
      res.status(500).send({ message: "Hubo un error al obtener las asistencias." });
    }
  }
  static async createAsistencia(req: Request, res: Response): Promise<any> {
    try {
      const { date, status, classId, studentId } = req.body;

      const [day, month, year] = date.split("/");
      const formattedDate = `${year}-${month}-${day}`;

      if (!date || status === undefined || !classId || !studentId) {
        return res.status(400).json({
          message: "Los campos 'date', 'status', 'classId' y 'studentId' son requeridos.",
        });
      }

      const claseRepository = pool.getRepository(Clases);
      const estudianteRepository = pool.getRepository(Estudiante);

      const clase = await claseRepository.findOneBy({ id: classId });
      const estudiante = await estudianteRepository.findOneBy({
        id: studentId,
      });

      if (!clase) {
        return res.status(404).json({ message: "Clase no encontrada." });
      }

      if (!estudiante) {
        return res.status(404).json({ message: "Estudiante no encontrado." });
      }

      const asistencia = await asistenciaService.createAsistencia({
        date: formattedDate,
        status,
        classEntity: clase,
        student: estudiante,
      });

      res.status(201).json(asistencia);
    } catch (error) {
      console.error("Error al crear asistencia: ", error);
      res.status(500).send({ message: "Hubo un error al crear la asistencia." });
    }
  }

  static async deleteAsistencia(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await asistenciaService.deleteAsistencia(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la asistencia." });
    }
  }
  static async updateAsistencia(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const { date, status, classId, studentId } = req.body;

      if (!date || status === undefined || !classId || !studentId) {
        return res.status(400).json({
          message: "Los campos 'date', 'status', 'classId' y 'studentId' son requeridos.",
        });
      }

      const [day, month, year] = date.split("/");
      const formattedDate = `${year}-${month}-${day}`;

      const claseRepository = pool.getRepository(Clases);
      const estudianteRepository = pool.getRepository(Estudiante);

      const clase = await claseRepository.findOneBy({ id: classId });
      const estudiante = await estudianteRepository.findOneBy({
        id: studentId,
      });

      if (!clase) {
        return res.status(404).json({ message: "Clase no encontrada." });
      }

      if (!estudiante) {
        return res.status(404).json({ message: "Estudiante no encontrado." });
      }

      const asistencia = await asistenciaService.updateAsistencia(id, {
        date: formattedDate,
        status,
        classEntity: clase,
        student: estudiante,
      });

      if (!asistencia) {
        return res.status(404).json({ message: "Asistencia no encontrada." });
      }

      res.status(200).json(asistencia);
    } catch (error) {
      console.error("Error al actualizar asistencia: ", error);
      res.status(500).send({ message: "Hubo un error al actualizar la asistencia." });
    }
  }
  static async filterAsistencias(req: Request, res: Response): Promise<any> {
    try {
      const { filter } = req.query;

      if (!filter || typeof filter !== "string") {
        return res.status(400).json({
          message: "El parámetro de filtro es requerido y debe ser una cadena de texto.",
        });
      }

      const asistencias = await asistenciaService.filterAsistencia(filter);

      if (asistencias.length === 0) {
        return res.status(404).json({
          message: "No se encontraron asistencias que coincidan con el filtro.",
        });
      }

      res.status(200).json(asistencias);
    } catch (error) {
      console.error("Error al filtrar asistencias: ", error);
      res.status(500).json({ message: "Hubo un error al filtrar las asistencias." });
    }
  }
}
