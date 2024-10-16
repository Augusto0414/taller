import { Like } from "typeorm";
import pool from "../database/config";
import { Asistencia } from "../models";

export class AsistenciaService {
  private asistenciaRepository = pool.getRepository(Asistencia);
  async getAllAsistencias(): Promise<Asistencia[]> {
    return await this.asistenciaRepository.find({
      relations: ["student", "classEntity"],
    });
  }
  async createAsistencia(dataAsistencia: Partial<Asistencia>): Promise<Asistencia> {
    const newAsistencia = this.asistenciaRepository.create(dataAsistencia);
    return await this.asistenciaRepository.save(newAsistencia);
  }
  async filterAsistencia(filter: string): Promise<Asistencia[]> {
    return await this.asistenciaRepository.find({
      where: [
        {
          student: {
            firstName: Like(`%${filter}%`),
          },
        },
        {
          classEntity: {
            name: Like(`%${filter}%`),
          },
        },
        {
          date: Like(`%${filter}%`),
        },
      ],
      relations: ["student", "classEntity"],
    });
  }
  async deleteAsistencia(id: string): Promise<void> {
    await this.asistenciaRepository.delete({ id });
  }
  async updateAsistencia(id: string, dataAsistencia: Partial<Asistencia>): Promise<Asistencia | null> {
    const asistencia = await this.asistenciaRepository.findOne({
      where: { id },
      relations: ["student", "classEntity"],
    });
    if (!asistencia) return null;
    this.asistenciaRepository.merge(asistencia, dataAsistencia);
    return await this.asistenciaRepository.save(asistencia);
  }
}
