const mongoose = require('mongoose')

const { MONGO_URL } = require('../config/config')

const mongoConnect = () => {

    const db=mongoose.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(()=>
        {console.log("Database connected succesfully !");
    })
        .catch(()=> {
            console.log("Connection to Database Failed !");
        });
}

module.exports =  mongoConnect()