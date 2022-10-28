import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import { router } from "./routes";
import "./database";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "./repositories/UsersRepository";
import { User } from "./entities/User";

const app = express();
// //login
////// const expres = require('express') //le cambie nombre
const passport = require('passport')
const session = require('express-session')
const cookieParser= require('cookie-parser')
const passportLocal = require('passport-local').Strategy


///
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//Permite leer los datos enviados por un formulario
app.use(router);


app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      error: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("view engine", "ejs");//nuestro motor para mostrar plantillas
app.set("views", path.join(__dirname, "..", "views"));

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});



app.get("/",(req,res)=>{
  //si ya iniciamos mostrar bienvenida
  //si no iniciamos sesion redireccionando a /login
 

})

app.get("/login",(req,res)=>{
  //mostrar el formulario del login

  
  res.render("login");
})

app.post("/login",passport.authenticate("local",{
  successRedirect: "/index",
  failureRedirect: "/"
}))

app.use(cookieParser('oozmaKappa'))

app.use(session({
  secret: "oozmaKappa",
  resave: true ,//cuando es true cada petición aunque la sesión no haya sido modificada la vamos a volver a guardar
  saveUninitialized: true ,//cuando esta true inicializamos sesion en una petición no le guardamos nada aún así se guarda
}))

app.use(passport.initialize()) //configuración contraseña

app.use(passport.session()) //configuración session

passport.use(new passportLocal (async function(email,password,done){
  const usersRepository = getCustomRepository(UsersRepository);
  const emailAlreadyExists = await usersRepository.findOne({ email });
  const passwordAlreadyExists = await usersRepository.findOne({ password });
  if (email=="geronimo@gmail" && password=="1234") {
     return done(null,email)
  }
  done(null,false)

}))

