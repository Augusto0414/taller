import { Request, Response } from "express";
import { ProfesorService } from "../service/profesor.service";

const profesorService = new ProfesorService();

export class ProfesorController {
  static async createProfesor(req: Request, res: Response): Promise<any> {
    try {
      const { firstName, lastName, email } = req.body;
      if (!firstName || !lastName || !email) {
        return res.status(400).send({ message: "Todos los campos son requeridos" });
      }
      const newProfesor = await profesorService.createProfesor({ firstName, lastName, email });
      res.status(201).send(newProfesor);
    } catch (error) {
      console.error("Error al crear profesor: ", error);
      res.status(500).send({ message: "Error inesperado en el backend" });
    }
  }
  static async getAllProfesores(req: Request, res: Response): Promise<void> {
    try {
      const profesores = await profesorService.getAllProfesores();
      res.send(profesores);
    } catch (error) {
      console.error("Error al obtener profesores: ", error);
      res.status(500).send({ message: "Error inesperado en el backend" });
    }
  }
  static async updateProfesor(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      const { firstName, lastName, email } = req.body;
      const updatedProfesor = await profesorService.updateProfesor(id, { firstName, lastName, email });
      if (!updatedProfesor) {
        res.status(404).send({ message: "Profesor no encontrado" });
        return;
      }
      res.send(updatedProfesor);
    } catch (error) {
      console.error("Error al actualizar profesor: ", error);
      res.status(500).send({ message: "Error inesperado en el backend" });
    }
  }

  static async deleteProfesor(req: Request, res: Response): Promise<void> {
    try {
      const id = req.params.id;
      await profesorService.deleteProfesor(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar profesor: ", error);
      res.status(500).send({ message: "Error inesperado en el backend" });
    }
  }
}
