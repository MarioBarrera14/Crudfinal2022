import { getCustomRepository } from "typeorm";
import { Categoria } from "../entities/categoria";
import { Producto } from "../entities/producto";
import { ProductoRepository } from "../repositories/productoRepository";

// interface IProducto {
//     id?:string;
//     nombre: string;
//     descripcion:string;
//     precio:number;
//     categoria?:Categoria[];
//   }
class ProductoService{
    async createProducto({ nombre, descripcion, precio,categoria }: Partial<Producto>) {
        if (!nombre || !descripcion || !precio ) {
          throw new Error("Por favor preencha todos os campos");
        }
        const productoRepository = getCustomRepository(ProductoRepository);
        const nombreAlreadyExists = await productoRepository.findOne({ nombre });
        if (nombreAlreadyExists) {
          throw new Error("nombre já está cadastrado");
        }
        const descripcionAlreadyExists = await productoRepository.findOne({ descripcion });
        if (descripcionAlreadyExists) {
          throw new Error("descripcion já está cadastrado");
        }


        const producto = productoRepository.create({ nombre, descripcion, precio,categoria});
    
        await productoRepository.save(producto);
    
        return producto;
    
      }
      async deleteProducto(id: string) {
        const productoRepository = getCustomRepository(ProductoRepository);
    
        const producto = await productoRepository
          .createQueryBuilder()
          .delete()
          .from(Producto)
          .where("id = :id", { id })
          .execute();
    
        return producto;
    
      }
      async getDataProducto(id: string) {
        const productoRepository = getCustomRepository(ProductoRepository);
    
        const producto = await productoRepository.findOne(id, {relations:['categoria']});
    
        return producto;
      }
      async listProductos() {
        const productosRepository = getCustomRepository(ProductoRepository);
    
        const productos = await productosRepository.find({
          relations:['categoria']
        });
    
        return productos;
      }
      async searchProducto(search: string) {
        if (!search) {
          throw new Error("Por favor preencha o campo de busca");
        }
    
        const productoRepository = getCustomRepository(ProductoRepository);
    
        const producto = await productoRepository
          .createQueryBuilder()
          .where("nombre like :search", { search: `%${search}%` })
          .orWhere("descripcion like :search", { search: `%${search}%` })
          .orWhere("precio like :search", { search: `%${search}%` })
          .getMany();
    
        return producto;
    
      }
      
      async updateProducto({ id, nombre, descripcion,precio }:Partial<Producto>) {
        const productoRepository = getCustomRepository(ProductoRepository);
    
        const producto = await productoRepository
          .createQueryBuilder()
          .update(Producto)
          .set({ nombre, descripcion,precio })
          .where("id = :id", { id })
          .execute();
    
        return producto;
    
      }


}
export default ProductoService;