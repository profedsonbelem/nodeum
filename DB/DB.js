const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/BDTOKEN',{
 useNewUrlParser: true
});

mongoose.connection.once("open",()=>{
     console.log('Mongoose conectado com sucesso');
});


module.export=mongoose;