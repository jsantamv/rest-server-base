const mongoose = require('mongoose');
require('colors')


const dbConnection = async () => {
    try {

        await mongoose.connect(process.env.MONGO_DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false //Utilizar ciertas funciones 
        });

        console.log('ServerDB Status => OnLine'.bgBlue)

    } catch (err) {
        console.log(err)
        throw new Error('Error a la hora de inciar la base de datos'.red)
    }
}

module.exports = {
    dbConnection
}