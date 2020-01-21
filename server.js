const express = require("express") ;
const pg = require("pg") ;
const bodyParser = require('body-parser')  ;

const db = require('./queries') ;
var cors = require('cors');

const app = express();
app.use(cors());

const {Client} = require('pg') ;

const client  = new Client ({
  user:"user",
  host: 'localhost',
  database: 'MovieAppDb',
  password: 'password',
  port: 5432,
})


client.connect()
.then(()=>console.log("Connected successfully"))
.then(()=> client.query("select * from movies"))
.then(results =>console.table(results.rows))
.catch(err =>console.log(err))
.finally(()=>client.end())



app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
)

app.get('/' , (req , res) =>{
    res.send("MovieApp api")
})

app.get('/movies/movieslist', db.getMovies)
app.post('/movie/add', db.AddMovie) ;
app.put('/movie/:id', db.updateMovie) ;
app.delete('/movie/:id', db.deleteMovie)

app.listen(3000 , ()=>{
    console.log("APP IS RUNNING")
})