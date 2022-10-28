import ProductoService from "../services/productoService";
import { Request, Response } from "express";



class ProductoController{
    private productoService:ProductoService;

    constructor(){
      this.productoService=new ProductoService();

    }
  
    async home(request: Request, response: Response) {
      return response.render("index");
    }
    
      async createProductoController(request: Request, response: Response) {
          const { nombre,descripcion,precio,categoria } = request.body;
         
          try {
            await this.productoService.createProducto({
              nombre,
              descripcion,
              precio,
              categoria
            }).then(() => {
              response.render("message", {
                message: "Producto añadido com éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `No se pudo agregar producto: ${err.message}`
            });
          }
      
        }
        async deleteProductoController(request: Request, response: Response) {
          const { id } = request.body;
  
          try {
            await this.productoService.deleteProducto(id).then(() => {
              response.render("message", {
                message: "Producto eliminado con éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `Error al eliminar producto: ${err.message}`
            });
          }
        }
        async dataProductoContoller(request: Request, response: Response) {
          let { id } = request.query;
          id = id.toString();
  
      
          const producto = await this.productoService.getDataProducto(id);
      
          return response.render("editProducto", {
            producto: producto
          });
        }
        async listProductoController(request: Request, response: Response) {
      
          const productos = await this.productoService.listProductos();
      
          return response.render("listProducto", {
            productos: productos
          });
        }
  
        async searchProductoController(request: Request, response: Response) {
          let { search } = request.query;
          search = search.toString();
  
      
          try {
            const productos = await this.productoService.searchProducto(search);
            response.render("searchProducto", {
              productos: productos,
              search: search
            });
          } catch (err) {
            response.render("message", {
              message: `Error al buscar producto: ${err.message}`
            });
          }
        }
  
        async updateUserController(request: Request, response: Response) {
          const { id, nombre,descripcion,precio} = request.body;
      
          try {
            await this.productoService.updateProducto({ id, nombre,descripcion,precio }).then(() => {
              response.render("message", {
                message: "Producto actualizado con éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `Error al actualizar producto: ${err.message}`
            });
          }
      
        }
        
  }
  export default ProductoController;