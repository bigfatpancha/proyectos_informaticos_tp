# proyectos_informaticos_tp
repositorio para el tp de proyectos informaticos

# Instalación de la API
Instalar previamente npm, sqlite3. Después correr:
- cd turnero_api
- npm install
- node_modules/.bin/sequelize db:migrate (Actualiza el schema de DB, o la crea si no existe)
- node_modules/.bin/sequelize db:seed:all (Genera datos iniciales)
Estos ultimos dos pasos hay que correrlos cada vez que haya un cambio en la DB.

# Ejecución de la API
- npm start
- Levanta en http://localhost:3000/

# Cambios en la DB
La DB es sqlite, se está integrando usando el ORM Sequelize, y los cambios se manejan mediante
migraciones usando Sequelize-CLI.
- Crear una nueva migración con los datos de la nueva tabla, o modificaciones que haya que hacer.
- Crear un nuevo seeder para darle valores iniciales si se quisiera.
- Crear o modificar el modelo correspondiente.
- Correr la migración y seeder.
- La nueva tabla se puede acceder en cualquier endpoint como req.db.NombreDeLaTabla

