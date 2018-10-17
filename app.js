require('./config/config')
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

//Middleware
//Información detallada en el terminal
app.use(morgan('dev'));
//Obtener los datos de las peticiones POST en el atributo body del request
app.use(bodyParser.urlencoded({
    extended:true
}));
//Configuración cookie-session
app.use(
    session({
        secret:'node'
    })
)

app.listen(port,function(){
    console.log('Escuchando en el puerto: ',port);
})
