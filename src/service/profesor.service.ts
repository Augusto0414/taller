import { Profesor } from "../models";
import pool from "../database/config";

export class ProfesorService {
  private profesorRepository = pool.getRepository(Profesor);
  async getAllProfesores(): Promise<Profesor[]> {
    return await this.profesorRepository.find();
  }

  async createProfesor(dataProfesor: Partial<Profesor>): Promise<Profesor> {
    const newProfesor = this.profesorRepository.create(dataProfesor);
    return await this.profesorRepository.save(newProfesor);
  }
  async updateProfesor(id: string, data: Partial<Profesor>): Promise<Profesor> {
    const profesorToUpdate = await this.profesorRepository.findOne({ where: { id } });
    if (!profesorToUpdate) {
      throw new Error("Profesor no encontrado");
    }

    const updatedProfesor = this.profesorRepository.merge(profesorToUpdate, data);
    return await this.profesorRepository.save(updatedProfesor);
  }

  async deleteProfesor(id: string): Promise<void> {
    const result = await this.profesorRepository.delete({ id });
    if (result.affected === 0) {
      throw new Error("Profesor no encontrado o no pudo ser eliminado");
    }
  }
}
