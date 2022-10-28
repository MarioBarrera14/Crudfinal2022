import { Repository, EntityRepository } from "typeorm";
import { Categoria } from "../entities/categoria";


@EntityRepository(Categoria)
class CategoriaRepository extends Repository<Categoria>{ }

export { CategoriaRepository };