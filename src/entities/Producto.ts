import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("productos")
class Producto {

  @PrimaryColumn()
  id: string;

  @Column()
  nombreProducto: string;

  @Column()
  descripcion: string;

  @Column()
  precio: number;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaModificacion: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }

}

export { Producto };