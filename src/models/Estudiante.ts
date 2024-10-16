import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Asistencia } from "./Asistencia";

@Entity("estudiante")
export class Estudiante {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  firstName: string;

  @Column({ type: "varchar", length: 100 })
  lastName: string;

  @Column({ type: "varchar", length: 150, unique: true })
  email: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;

  @OneToMany(() => Asistencia, (attendance) => attendance.student)
  attendances: Asistencia[];
}
