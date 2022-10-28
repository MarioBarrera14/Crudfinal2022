import { getCustomRepository } from "typeorm";
import { ProductRepository } from "../repositories/ProductRepository ";
import { Producto } from "../entities/Producto";
import IProducto from "../interfaces/iProducto";

class ProductServices {
    async create({ nombreProducto,descripcion,precio }: IProducto) {
      if (!nombreProducto || !descripcion || !precio ) {
        throw new Error("Por favor, llene todos los campos.");
      }
  
      const productRepository = getCustomRepository(ProductRepository);
  
      const productNameAlreadyExists = await productRepository.findOne({ nombreProducto });
  
      if (productNameAlreadyExists) {
        throw new Error("El nombre del producto seleccionado ya está registrado.");
      }

      const producto = productRepository.create({ nombreProducto,descripcion,precio });
  
      await productRepository.save(producto);
  
      return producto;    
  
    }

    async update({ id, nombreProducto,descripcion,precio}: IProducto) {
        const productsRepository = getCustomRepository(ProductRepository);
    
        const products = await productsRepository
          .createQueryBuilder()
          .update(Producto)
          .set({ nombreProducto,descripcion,precio })
          .where("id = :id", { id })
          .execute();
    
        return products;
    
      }

      async search(search: string) { //recibe el sting de busqueda
        if (!search) { //si no obtiene nada, al realizar la busqueda, tira el siguiente error:
          throw new Error("Por favor, llene el campo de búsqueda.");
        }
    
        const productsRepository = getCustomRepository(ProductRepository); //implementa repositorio de la base de datos (del typeorm)
    
        const products = await productsRepository 
          .createQueryBuilder() //Crea la consulta a la base de datos basada en el dato proporcionado
          .where("nombreProducto like :search", { search: `%${search}%` }) //puede ser
          .orWhere("descripcion like :search", { search: `%${search}%` }) //cualquiera de los siguientes.
          .orWhere("precio like :search", { search: `%${search}%` })
          .getMany();
    
        return products; //retorna el objeto del los usuarios que encontró
    
      }

      async list() {
        const productsRepository = getCustomRepository(ProductRepository);
    
        const products = await productsRepository.find();
    
        return products;
      }
      async getData(id: string) {
        const productsRepository = getCustomRepository(ProductRepository);
    
        const product = await productsRepository.findOne(id);
    
        return product;
      }

      async delete(id: string) {
        const productsRepository = getCustomRepository(ProductRepository);
    
        const product = await productsRepository
          .createQueryBuilder()
          .delete()
          .from(Producto)
          .where("id = :id", { id })
          .execute();
    
        return product;
    
      }



  }

  export default ProductServices;