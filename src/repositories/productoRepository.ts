import { Repository, EntityRepository } from "typeorm";
import { Producto } from "../entities/producto";


@EntityRepository(Producto)
class ProductoRepository extends Repository<Producto>{ }

export { ProductoRepository };