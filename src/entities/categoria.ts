import { Column, CreateDateColumn, Entity, PrimaryColumn,  OneToMany, ManyToOne} from "typeorm";
import { v4 as uuid } from "uuid";
import { Producto } from "./producto";


@Entity("categorias")
class Categoria{


    @PrimaryColumn()
    id: string;
    @Column()
    nombre: string;
    @OneToMany(type => Producto,producto => producto.categoria)
    productos:Producto[]

    constructor() {
        if (!this.id) {
          this.id = uuid();
        }
      }

   
    set setNombre(v:string){
        this.nombre=v
    }
}
export {Categoria};