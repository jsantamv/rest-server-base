const express = require('express')
const cors = require('cors')
require('dotenv').config()


class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        //Middlewares 
        this.middleware()

        // Routes de mi app
        this.routes();
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
        this.app.use(this.usersPath, require('../routes/user.routes'))
    }

    lisetn() {
        this.app.listen(this.port, () => {
            console.log(`Server en => http://localhost:${this.port}`)
            console.log(`Server en => http://localhost:${this.port}/api`)

        })
    }
}

module.exports = Server