import { Request, Response } from "express";
import UsuarioService from "../services/usuarioService";


class UsuarioController{
  private usuarioService:UsuarioService;
  constructor(){
    this.usuarioService=new UsuarioService();
  }

  
    async createUsuarioController(request: Request, response: Response) {
        const { nombre, email, telefone, cidade, estado,password } = request.body;
        try {
          await this.usuarioService.createUser({
            nombre,
            email,
            telefone,
            cidade,
            estado,
            password
          }).then(() => {
            response.render("message", {
              message: "Usuário cadastrado com sucesso"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao cadastrar usuário: ${err.message}`
          });
        }
    
      }
      async deleteUsuarioController(request: Request, response: Response) {
        const { id } = request.body;

    
        try {
          await this.usuarioService.deleteUser(id).then(() => {
            response.render("message", {
              message: "Usuário deletado com sucesso"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao deletar usuário: ${err.message}`
          });
        }
      }
      async dataUsuarioContoller(request: Request, response: Response) {
        let { id } = request.query;
        id = id.toString();

    
        const user = await this.usuarioService.getDataUser(id);
    
        return response.render("edit", {
          user: user
        });
      }
      async listUsuarioController(request: Request, response: Response) {
    
        const users = await this.usuarioService.listUser();
    
        return response.render("list", {
          users: users
        });
      }

      async searchUserController(request: Request, response: Response) {
        let { search } = request.query;
        search = search.toString();

    
        try {
          const users = await this.usuarioService.searchUser(search);
          response.render("search", {
            users: users,
            search: search
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao buscar usuário: ${err.message}`
          });
        }
      }

      async updateUserController(request: Request, response: Response) {
        const { id, nombre, email, telefone, cidade, estado,password } = request.body;
    
    
        try {
          await this.usuarioService.updateUser({ id, nombre, email, telefone, cidade, estado,password }).then(() => {
            response.render("message", {
              message: "Usuário atualizado com sucesso"
            });
          });
        } catch (err) {
          response.render("message", {
            message: `Erro ao atualizar usuário: ${err.message}`
          });
        }
    
      }
      
}
export default UsuarioController;