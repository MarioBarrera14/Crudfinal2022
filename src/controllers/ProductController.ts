import { Request, Response } from "express";
import ProductServices from "../services/ProductServices";

class ProductController {
  private service:ProductServices;
  constructor(){
    this.service=new ProductServices();
  }
  async handleCreateProduct(request: Request, response: Response) {
    const { nombreProducto,descripcion,precio } = request.body;

    

    try {
      await this.service.create({
        nombreProducto,
        descripcion,
        precio,
        }).then(() => {
        response.render("message", {
          message: "Producto registrado con éxito."
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al registrar producto: ${err.message}`
      });
    }

  }

  async handleSearchProduct(request: Request, response: Response) {
    let { search } = request.query; //Recupera la busqueda de la URL
    search = search.toString(); //Formatea la busqueda a String.


    try { //implementa los metodos del servicio.
      const products = await this.service.search(search);
      response.render("search", {
        products: products,
        search: search
      });
    } catch (err) {
      response.render("message", {
        message: `Error al buscar producto: ${err.message}`
      });
    }
  }

  async handleGetProductData(request: Request, response: Response) {
    let { id } = request.query;
    id = id.toString();

    const product = await this.service.getData(id);

    return response.render("edit", {
      product: product
    });
  }

  async handleUpdateProductData(request: Request, response: Response) {
    const { id, nombreProducto,descripcion,precio } = request.body;

    
    try {
      await this.service.update({ id, nombreProducto,descripcion,precio }).then(() => {
        response.render("message", {
          message: "Producto actualizado con éxito."
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al actualizar producto: ${err.message}`
      });
    }

  }

  async handleDeleteProduct(request: Request, response: Response) {
    const { id } = request.body;

    try {
      await this.service.delete(id).then(() => {
        response.render("message", {
          message: "Producto eliminado exitosamente."
        });
      });
    } catch (err) {
      response.render("message", {
        message: `Error al eliminar producto: ${err.message}`
      });
    }
  }
  async handleListProducts(request: Request, response: Response) {
    const products = await this.service.list();

    return response.render("index", {
      products: products
    });
  }


}

export default ProductController;