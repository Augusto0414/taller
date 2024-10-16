import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from "typeorm";
import { Clases } from "./Clases";

@Entity("profesor")
export class Profesor {
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

  @OneToMany(() => Clases, (classEntity) => classEntity.professor)
  classes: Clases[];
}
