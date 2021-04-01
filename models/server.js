const express = require('express')
const cors = require('cors')
require('dotenv').config()
require('colors')

const { dbConnection } = require('../database/config')


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'
        this.authPath = '/api/auth'

        //conectar a la db
        this.databaseCNN()

        //Middlewares 
        this.middleware()

        // Routes de mi app
        this.routes();
    }

    async databaseCNN() {
        await dbConnection()
    }

    middleware() {
        //CORS        
        this.app.use(cors())

        //Lectura y Parseo del Body
        //lo que viene formatea en JSON
        this.app.use(express.json())
        
        // directorio publico
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.routes'))
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server Listen => http://localhost:${this.port}`.bgBlue)
        })
    }
}

module.exports = Server