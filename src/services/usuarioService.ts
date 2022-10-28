import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";
import { User } from "../entities/User";



interface IUser {
    id?:string;
    nombre: string;
    email: string;
    telefone: string;
    cidade: string;
    estado: string;
    password:string;
  }

class UsuarioService{
    async createUser({ nombre, email, telefone, cidade, estado,password }: IUser) {
        if (!nombre || !email || !telefone || !cidade || !estado || !password) {
          throw new Error("Por favor preencha todos os campos");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const usernameAlreadyExists = await usersRepository.findOne({ nombre });
    
        if (usernameAlreadyExists) {
          throw new Error("Username já está cadastrado");
        }
    
        const emailAlreadyExists = await usersRepository.findOne({ email });
    
        if (emailAlreadyExists) {
          throw new Error("Email já está cadastrado");
        }
    
        const user = usersRepository.create({ nombre, email, telefone, cidade, estado,password});
    
        await usersRepository.save(user);
    
        return user;
    
      }
      async deleteUser(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .delete()
          .from(User)
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }
      async getDataUser(id: string) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository.findOne(id);
    
        return user;
      }
      async listUser() {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const users = await usersRepository.find();
    
        return users;
      }
      async searchUser(search: string) {
        if (!search) {
          throw new Error("Por favor preencha o campo de busca");
        }
    
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .where("nombre like :search", { search: `%${search}%` })
          .orWhere("email like :search", { search: `%${search}%` })
          .orWhere("telefone like :search", { search: `%${search}%` })
          .orWhere("cidade like :search", { search: `%${search}%` })
          .orWhere("estado like :search", { search: `%${search}%` })
          .orWhere("password like :search", { search: `%${search}%` })
          .getMany();
    
        return user;
    
      }
      
      async updateUser({ id, nombre, email, telefone, cidade, estado,password }: IUser) {
        const usersRepository = getCustomRepository(UsersRepository);
    
        const user = await usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ nombre, email, telefone, cidade, estado })
          .where("id = :id", { id })
          .execute();
    
        return user;
    
      }


}
export default UsuarioService;