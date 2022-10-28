import { getCustomRepository } from "typeorm";
import { Categoria } from "../entities/categoria";
import { CategoriaRepository } from "../repositories/categoryRepository";

interface ICategoria {
    id?:string;
    nombre: string;
  }

class CategoriaService{
    async createCategoria({ nombre}: ICategoria) {
        if (!nombre  ) {
          throw new Error("Por favor ingrese el campo nombre");
        }
 
        const categoriaRepository = getCustomRepository(CategoriaRepository);
    
        const nombreAlreadyExists = await categoriaRepository.findOne({ nombre });
    
        if (nombreAlreadyExists) {
          throw new Error("nombre ya está en la base de datos");
        }
    
        const cat = categoriaRepository.create({ nombre });
    
        await categoriaRepository.save(cat);
    
        return cat;
    
      }
      async deleteCategoria(id: string) {
        const categoriaRepository = getCustomRepository(CategoriaRepository);
    
        const categoria = await categoriaRepository
          .createQueryBuilder()
          .delete()
          .from(Categoria)
          .where("id = :id", { id })
          .execute();
    
        return categoria;
    
      }
      async getDataCategoria(id: string) {
        const categoriaRepository = getCustomRepository(CategoriaRepository);
    
        const categoria = await categoriaRepository.findOne(id);
    
        return categoria;
      }
      async listCategoria() {
        const categoriasRepository = getCustomRepository(CategoriaRepository);
    
        const categorias = await categoriasRepository.find();
    
        return categorias;
      }
      async searchCategoria(search: string) {
        if (!search) {
          throw new Error("Por favor preencha o campo de busca");
        }
    
        const categoriaRepository = getCustomRepository(CategoriaRepository);
    
        const categoria = await categoriaRepository
          .createQueryBuilder()
          .where("nombre like :search", { search: `%${search}%` })

    
        return categoria;
    
      }
      
      async updateCategoria({ id, nombre }: ICategoria) {
        const categoriaRepository = getCustomRepository(CategoriaRepository);
    
        const producto = await categoriaRepository
          .createQueryBuilder()
          .update(Categoria)
          .set({ nombre})
          .where("id = :id", { id })
          .execute();
    
        return producto;
    
      }


}
export default CategoriaService;