
const express = require("express");
const bodyParser= require("body-parser");
const cors = require("cors");
require('./DB/DB');
const User = require('./Model/Usuario');
const jwt = require('jsonwebtoken');
const secret="engenheiros-js";
const app= express();
const planos=[
 {
     "nomePlano": "planoum",
     "valor": 1500,
     "dataAfiliacao": '2020-07-10 19:15:00',
 },{
    "nomePlano": "planoum",
    "valor": 2000,
    "dataAfiliacao": '2020-07-20 19:15:00',
 },
 {
    "nomePlano": "planoum",
    "valor": 2500,
    "dataAfiliaao": '2020-07-30 19:15:00',
 }
]
app.use(cors());
app.use(bodyParser.json());

app.get("/plano", (req,res)=>{

   res.json(planos);

})




app.post("/register", (req, res)=>{
     
     let dados = req.body;
     let user = new User(dados);
      
     user.save()
           .then(resposta=>
                res.json(resposta)
           )
           .catch(err=>{
                 res.json(err)            
           })     
});



app.post("/logar", (req, res)=>{
    
    let dados = req.body;

      let resp  = {"msg":"aula de js"};

    const consulta={"email": dados.email,"password":  dados.password};

         User.findOne(consulta)
        .then(resposta=>{
            let resultado= resposta;
            if (resultado.perfil=='administrador'){
              
              let token = jwt.sign({
                  "email": resultado.email  
              },secret )
            resp.token = token;

              res.json({"usuario":resposta,"token":resp.token});

           }
          else{
            res.json(resultado);
          }


    })
          .catch(err=>{
                res.json(err)            
          }) 
});


//so lista usuario se for adm e com token bearer

 




function fnValidacao(req, res, next){
    let erro = { success: false, msg: 'Erro de autenticacao'};
    let authorization = req.headers['authorization'];
  console.log(authorization);

    if(authorization){
        let token = authorization.split(' ')[1];
        console.log('Autorizacao: ', JSON.stringify(authorization));
        console.log('Token: ', token);
       

        jwt.verify(token, secret, function(err, decoded){
            if(err){
                console.log('Erro: ', err);
                res.status(403).json(erro);
                return;
            }else{
                console.log("show");
                next();
            }
        });
        return;
    }
    res.status(401).json(erro);
}



app.listen(4020, function(){
    console.log("Porta 4020 funcionando");
});
