import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from "typeorm";
import { Estudiante } from "./Estudiante";
import { Clases } from "./Clases";

@Entity("asistencia")
export class Asistencia {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Clases, (clases) => clases.attendances, { onDelete: "CASCADE" })
  classEntity: Clases;

  @ManyToOne(() => Estudiante, (student) => student.attendances, { onDelete: "CASCADE" })
  student: Estudiante;

  @Column({ type: "date" })
  date: string;

  @Column({ type: "boolean" })
  status: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
