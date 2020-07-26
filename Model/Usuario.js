const mongoose= require("mongoose");

const UserSchema = mongoose.Schema({
    codigo : Number, 
    nome  : String,
    email : String,
    password : String,
    perfil : String,
    valorPlano : Number,
    nomePlano  : String,
    status : String
})

const User = mongoose.model('users',UserSchema )

module.exports=User;