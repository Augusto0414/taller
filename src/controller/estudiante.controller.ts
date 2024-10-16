import { Request, Response } from "express";
import { EstudianteService } from "../service/estudiante.service";

const estudianteService = new EstudianteService();

export class EstudianteController {
  static async createStudent(req: Request, res: Response): Promise<any> {
    try {
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).send({ message: "Todos los campos son requeridos" });
      }

      const newStudent = await estudianteService.createStudent({ firstName, lastName, email });
      res.status(201).send(newStudent);
    } catch (error) {
      console.error("Error al crear estudiante:", error);
      res.status(500).send({ message: "Error al crear al estudiante", error });
    }
  }
  static async getAllEstudiantes(req: Request, res: Response): Promise<any> {
    try {
      const estudiantes = await estudianteService.getAllEstudiantes();
      res.send(estudiantes);
    } catch (error) {
      console.error("Error al obtener estudiantes:", error);
      res.status(500).send({ message: "Error al obtener estudiantes", error });
    }
  }

  static async updateStudent(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      const { firstName, lastName, email } = req.body;

      if (!firstName || !lastName || !email) {
        return res.status(400).send({ message: "Todos los campos son requeridos" });
      }

      const updatedStudent = await estudianteService.updateStudent(id, { firstName, lastName, email });
      res.send(updatedStudent);
    } catch (error) {
      console.error("Error al actualizar estudiante:", error);
      res.status(500).send({ message: "Error al actualizar estudiante", error });
    }
  }

  static async deleteStudent(req: Request, res: Response): Promise<any> {
    try {
      const id = req.params.id;
      await estudianteService.deleteStudent(id);
      res.status(204).send();
    } catch (error) {
      console.error("Error al eliminar estudiante:", error);
      res.status(500).send({ message: "Error al eliminar estudiante", error });
    }
  }
}
