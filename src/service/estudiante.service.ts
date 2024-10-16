import { Estudiante } from "../models";
import pool from "../database/config";

export class EstudianteService {
  private estudianteRepository = pool.getRepository(Estudiante);

  async getAllEstudiantes(): Promise<Estudiante[]> {
    return await this.estudianteRepository.find();
  }

  async createStudent(student: Partial<Estudiante>): Promise<Estudiante> {
    const newStudent = this.estudianteRepository.create(student);
    return await this.estudianteRepository.save(newStudent);
  }
  async updateStudent(id: string, student: Partial<Estudiante>): Promise<Estudiante> {
    const existingStudent = await this.estudianteRepository.findOne({ where: { id } });
    if (!existingStudent) {
      throw new Error("Estudiante no encontrado");
    }

    const updatedStudent = this.estudianteRepository.merge(existingStudent, student);
    return await this.estudianteRepository.save(updatedStudent);
  }
  async deleteStudent(id: string): Promise<void> {
    const result = await this.estudianteRepository.delete({ id });
    if (result.affected === 0) {
      throw new Error("Estudiante no encontrado o no pudo ser eliminado");
    }
  }
}
