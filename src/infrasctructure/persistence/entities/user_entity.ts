import "reflect-metadata";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryColumn({ type: "uuid" })
  id!: string;

  @Column()
  name!: string;
}
