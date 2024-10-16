import { Like } from "typeorm";
import pool from "../database/config";
import { Clases } from "../models";

export class ClasesService {
  private clasesRepository = pool.getRepository(Clases);
  async getAllClases(): Promise<Clases[]> {
    return await this.clasesRepository.find({
      relations: ["professor", "attendances"],
    });
  }
  async createClase(dataClasss: Partial<Clases>): Promise<Clases> {
    const newClass = this.clasesRepository.create(dataClasss);
    return await this.clasesRepository.save(newClass);
  }
  async filterClass(filter: string): Promise<Clases[]> {
    return await this.clasesRepository.find({
      where: {
        name: Like(`%${filter}%`),
      },
    });
  }
  async deleteClass(id: string): Promise<void> {
    await this.clasesRepository.delete({ id });
  }
  async updateClass(id: string, dataClasss: Partial<Clases>): Promise<Clases | null> {
    const data = await this.clasesRepository.findOne({ where: { id } });
    if (!data) return null;

    const updateClass = this.clasesRepository.merge(data, dataClasss);
    return await this.clasesRepository.save(updateClass);
  }
}
