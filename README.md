# Configuracion de un REST server
Este es una configuracion basica para un REST Server API
Conectandose a una base de datos de MONGODB
para descargar y montar en cualquier momento.

Ejecutar ```npm install``` para reconstruir los modulos

## Paquetes utilizados
1. Express : Servidor
2. dotenv : Variables de entorno archivo .env
3. CORS https://www.npmjs.com/package/cors
4. Utilizar NODEMON nodemon app

## Paquete para instalar la password
1. bcryptjs: https://www.npmjs.com/package/bcryptjs ```npm i bcryptjs```
2. Validaciones de expreciones regulares ```npm install express-validator``` https://express-validator.github.io/docs/
3. JWT ```npm install jsonwebtoken``` doc https://www.npmjs.com/package/jsonwebtoken


## Leer Logs en HEROKU por linea de comandos
```heroku logs -n 100 --tail```
donde 100 es la cantidad a observar de los ulitmos logs
y tail, para mantener escuchando los logs
