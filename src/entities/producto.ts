import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn,ManyToOne, OneToMany } from "typeorm";
import { v4 as uuid } from "uuid";
import { Categoria } from "./categoria";

@Entity("producto")
class Producto{
    @PrimaryColumn()
    id: string;
    
    @Column()
    nombre: string;

    @Column()
    descripcion:string;

    @Column()
    precio:number;

    @ManyToOne(type => Categoria,categoria => categoria.productos)
    categoria:Categoria[]

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }
   
}
export {Producto};

