sudo mongod 
sudo mongo
use BDTOKEN;
db;
db.users.insertMany([{
"codigo":100,
"nome":"lu",
"email": "lu@gmail.com",
"password": "123456",
"perfil": "administrador",
"valorPlano": 500,
"nomePlano": "planoUm",
"status": "ativo"
},
{
 "codigo":101,
 "nome":"reueu",
  "email": "reueu@gmail.com",
 "password": "123456",
 "perfil": "cliente",
 "valorPlano": 1500,
 "nomePlano": "planoDois",
 "status": "ativo"
}
]
);

 db.users.find().pretty();





}])