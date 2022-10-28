
import { Request, Response } from "express";
import categoriaService from "../services/categoriaService";

class CategoriaController{
    private categoriaService:categoriaService;
    constructor(){
      this.categoriaService=new categoriaService();
    }
  
    async home(request: Request, response: Response) {
      return response.render("index");
    }
    
      async createCategoriaController(request: Request, response: Response) {
          const { nombre } = request.body;
          try {
            await this.categoriaService.createCategoria({
              nombre,
            }).then(() => {
              response.render("message", {
                message: "Categoria añadido com éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `No se pudo agregar producto: ${err.message}`
            });
          }
      
        }
        async deleteCategoriaController(request: Request, response: Response) {
          const { id } = request.body;
  
          try {
            await this.categoriaService.deleteCategoria(id).then(() => {
              response.render("message", {
                message: "Categoria eliminado con éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `Error al eliminar producto: ${err.message}`
            });
          }
        }
        async dataCategoriaContoller(request: Request, response: Response) {
          let { id } = request.query;
          id = id.toString();
  
      
          const categoria = await this.categoriaService.getDataCategoria(id);
      
          return response.render("editCategoria", {
            categoria: categoria
          });
        }
        async listCategoriasController(request: Request, response: Response) {
      
          const categorias = await this.categoriaService.listCategoria();
      
          return response.render("listCategoria", {
            categorias: categorias
          });
        }
  
        async searchCategoriaController(request: Request, response: Response) {
          let { search } = request.query;
          search = search.toString();
  
      
          try {
            const categorias = await this.categoriaService.searchCategoria(search);
            response.render("searchCategoria", {
              categorias: categorias,
              search: search
            });
          } catch (err) {
            response.render("message", {
              message: `Error al buscar producto: ${err.message}`
            });
          }
        }
  
        async updateCategoriaController(request: Request, response: Response) {
          const { id, nombre} = request.body;
      
          try {
            await this.categoriaService.updateCategoria({ id, nombre }).then(() => {
              response.render("message", {
                message: "Categoria actualizado con éxito"
              });
            });
          } catch (err) {
            response.render("message", {
              message: `Error al actualizar producto: ${err.message}`
            });
          }

        }
        
  }
  export default CategoriaController;