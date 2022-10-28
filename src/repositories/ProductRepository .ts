import { Repository, EntityRepository } from "typeorm";
import { Producto } from "../entities/Producto";

@EntityRepository(Producto)
class ProductRepository extends Repository<Producto>{ }

export { ProductRepository };