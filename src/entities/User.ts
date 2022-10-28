import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("usuarios")
class User {

  @PrimaryColumn()
  id: string;

  @Column()
  nombre: string;

  @Column()
  email: string;

  @Column()
  telefone: string;

  @Column()
  cidade: string;

  @Column()
  estado: string;

  @Column()
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
  

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { User };