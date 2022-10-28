# CRUD Node.js
CRUD hecho con Node.js, Express, TypeScript, TypeORM, EJS & amp y SQLite por @sinvalbsneto. 

Traducido al español y modificado por el equipo 2, 'Oozma Kappa'.

![Home page image](https://user-images.githubusercontent.com/96827491/191409568-51e779d8-1ab0-4b87-9e2f-79fa8a29dbd4.png)

## ¿Cómo correr el proyecto?

Una vez clonado, debemos decidir si usaremos yarn o npm para manejar los paquetes del repositorio.  
#
## Utilizando Yarn:

- Correr `yarn` para descargar las dependecias.
- Crear un archivo llamado `database.sqlite` dentro de la carepta `src/database`.
- Correr `yarn typeorm migration:run` en la terminal para realizar la migracion de datos.
- Correr `yarn dev` para levantar el server.
#
## Utilizando NPM:
- Correr `npm install --location=local` para instalar las dependencias.
- Correr `npm run typeorm migration:run` para realizar la migracion de los datos.
- Correr `npm run dev` para levantar el server.

>El proyecto se levanta en la siguiente ruta: `http://localhost:3000` .

#
#
#
>Nota: Este es un 'fork' realizado en la clase de Programacion 2 del siguiente repositorio: https://github.com/sinvalbsneto/crud_nodejs
