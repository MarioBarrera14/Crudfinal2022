import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { Usuario } from "../entities/User";
import IUsuario from "../interfaces/IUsuario";

class UserService {
    async create({ nombreUsuario, eMail, teléfono, ciudad, provincia }: IUsuario) {
      if (!nombreUsuario || !eMail || !teléfono || !ciudad || !provincia) {
        throw new Error("Por favor, llene todos los campos.");
      }
  
      const usersRepository = getCustomRepository(UsersRepository);
  
      const usernameAlreadyExists = await usersRepository.findOne({ nombreUsuario });
  
      if (usernameAlreadyExists) {
        throw new Error("El nombre de usuario seleccionado ya está registrado.");
      }
  
      const emailAlreadyExists = await usersRepository.findOne({ eMail });
  
      if (emailAlreadyExists) {
        throw new Error("El e-mail seleccionado ya está registrado.");
      }
  
      const user = usersRepository.create({ nombreUsuario, eMail, teléfono, ciudad, provincia });
  
      await usersRepository.save(user);
  
      return user;    
  
    }

    async update({ id, nombreUsuario, eMail, teléfono, ciudad, provincia}: IUsuario) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .update(Usuario)
          .set({ nombreUsuario, eMail, teléfono, ciudad, provincia })
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }

      async search(search: string) { //recibe el sting de busqueda
        if (!search) { //si no obtiene nada, al realizar la busqueda, tira el siguiente error:
          throw new Error("Por favor, llene el campo de búsqueda.");
        }
    
        const usersRepository = getCustomRepository(UsersRepository); //implementa repositorio de la base de datos (del typeorm)
    
        const user = await usersRepository 
          .createQueryBuilder() //Crea la consulta a la base de datos basada en el dato proporcionado
          .where("nombreUsuario like :search", { search: `%${search}%` }) //puede ser
          .orWhere("eMail like :search", { search: `%${search}%` }) //cualquiera de los siguientes.
          .orWhere("teléfono like :search", { search: `%${search}%` })
          .orWhere("ciudad like :search", { search: `%${search}%` })
          .orWhere("provincia like :search", { search: `%${search}%` })
          .getMany();
    
        return user; //retorna el objeto del los usuarios que encontró
    
      }

      async list() {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const users = await usersRepository.find();
    
        return users;
      }
      async getData(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
      }

      async delete(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .delete()
          .from(Usuario)
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }



  }

  export default UserService;