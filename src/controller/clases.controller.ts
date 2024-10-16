import { Request, Response } from "express";
import { ClasesService } from "../service/clases.service";

const clasesService = new ClasesService();

export class ClasesController {
  static async getAllClases(req: Request, res: Response): Promise<void> {
    try {
      const clases = await clasesService.getAllClases();
      res.json(clases);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener las clases." });
    }
  }
  static async createClase(req: Request, res: Response): Promise<any> {
    try {
      const { name, description, professor } = req.body;

      if (!name || !professor) {
        return res.status(400).json({ message: "Los campos 'nombre' y 'professor' son requeridos." });
      }
      const newClase = await clasesService.createClase({ name, description, professor });
      res.status(201).json(newClase);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la clase." });
    }
  }
  static async filterClass(req: Request, res: Response): Promise<void> {
    try {
      const filter = req.query.filter as string;
      if (!filter) {
        res.status(400).json({ message: "Debe especificar un filtro." });
        return;
      }
      const clases = await clasesService.filterClass(filter);
      res.json(clases);
    } catch (error) {
      res.status(500).json({ message: "Error al filtrar las clases." });
    }
  }
  static async deleteClass(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await clasesService.deleteClass(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la clase." });
    }
  }
  static async updateClass(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { name, description, professor } = req.body;
      const dataClasss = { name, description, professor };
      const updatedClass = await clasesService.updateClass(id, dataClasss);
      if (!updatedClass) {
        res.status(404).json({ message: "Clase no encontrada." });
        return;
      }
      res.json(updatedClass);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la clase." });
    }
  }
}
