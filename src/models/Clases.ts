import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Profesor } from "./Profesor";
import { Asistencia } from "./Asistencia";

@Entity("clases")
export class Clases {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 100 })
  name: string;

  @Column({ type: "text", nullable: true })
  description: string;

  @ManyToOne(() => Profesor, (professor) => professor.classes, { onDelete: "CASCADE" })
  professor: Profesor;

  @OneToMany(() => Asistencia, (attendance) => attendance.classEntity)
  attendances: Asistencia[];

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
}
