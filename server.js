require('dotenv').config()
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const bodyParser = require('body-parser');
const schema = require('./graphql/schema')
const root = require('./graphql/resolver');
const api = require('./api') 
const home = require('./routes') 
const pgClient = require ('./db');


const PORT = process.env.PORT || 5000

const app = express();

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

app.use(express.static('public'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/', (req, res)=> {
    res.render('index' )
})
app.use('/home', home)
// app.get('', (req, res)=> {
//     res.render('index', )
// })
app.use('/api', api)

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));



pgClient
  .connect()
  .then(() => {
      console.log('db connected')
      pgClient.query(`SET search_path TO '${process.env.db_schema}';`)
      app.listen(PORT);
      console.log(`Running a GraphQL API server at http://localhost:${PORT}/graphql`);
    })
  .catch(err => console.error('connection error', err.stack))

