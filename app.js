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

//Configuración de EJS, Template Engine
app.set('view engine', 'ejs');
//Compartir recuros
app.use('/public', express.static('public'))

let tareas = ['Uno', 'Dos'];

//Ruta inical
app.get('/',function(request,response){
    response.render('formulario.ejs',{
        tareas
    });
})

//Ruta formulario adicionar
app.post('/adicionar',function(request,response){
    let tarea = request.body.nuevaTarea;
    tareas.push(tarea);
    response.redirect('/');
})

//Ruta formulario eliminar
app.get('/borrar/:id',function(request,response){
    let id = +request.params.id;
    tareas.splice(id,1);
    response.redirect('/');
})

app.listen(port,function(){
    console.log('Escuchando en el puerto: ',port);
})
