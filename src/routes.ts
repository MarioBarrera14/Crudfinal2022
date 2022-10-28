import { Router } from "express";
import CategoriaController from "./controllers/categoriaController";
import ProductoController from "./controllers/productoController";

import UsuarioController from "./controllers/usuarioController";
import CategoriaService from "./services/categoriaService";


const router = Router();
const usuarioController =new UsuarioController();
const productoController =new ProductoController();
const categoriaController =new CategoriaController();
const categoria= new CategoriaService();


router.get("/list", usuarioController.listUsuarioController.bind(usuarioController));


router.get("/", (request, response) => {
  response.render("login");
}
);
router.get("/index", (request, response) => {
  response.render("index");
}
);


router.get("/add", (request, response) => {
  response.render("add");
});

router.post("/add-user", usuarioController.createUsuarioController.bind(usuarioController));

router.get("/search", usuarioController.searchUserController.bind(usuarioController));

router.get("/edit", usuarioController.dataUsuarioContoller.bind(usuarioController));

router.post("/edit-user", usuarioController.updateUserController.bind(usuarioController));

router.post("/delete-user", usuarioController.deleteUsuarioController.bind(usuarioController));

//rutas de producto

router.get("/listProductos", productoController.listProductoController.bind(productoController));

router.get("/addProducto", async (request, response) => {
  const categorias = await categoria.listCategoria();
  response.render("addProducto", {cats:categorias});
});

router.post("/add-producto", productoController.createProductoController.bind(productoController));

router.get("/searchProducto", productoController.searchProductoController.bind(productoController));

router.get("/editProducto", productoController.dataProductoContoller.bind(productoController));

router.post("/edit-producto", productoController.updateUserController.bind(productoController));

router.post("/delete-producto", productoController.deleteProductoController.bind(productoController));
//rutas categoria
router.get("/listCategorias", categoriaController.listCategoriasController.bind(categoriaController));

router.post("/add-categoria", categoriaController.createCategoriaController.bind(categoriaController));

router.get("/editCategoria", categoriaController.dataCategoriaContoller.bind(categoriaController));

router.post("/edit-categoria", categoriaController.updateCategoriaController.bind(categoriaController));

router.post("/delete-categoria", categoriaController.deleteCategoriaController.bind(categoriaController));

router.get("/searchCategoria", categoriaController.searchCategoriaController.bind(categoriaController));

router.get("/addCategoria", (request, response) => {
  response.render("addCategoria");
});

//login


export { router };
