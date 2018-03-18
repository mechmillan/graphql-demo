let express = require('express');
const graphqlHTTP = require('express-graphql'); // HTTP server middleware
const fetch = require('node-fetch'); // to perform our POST request
const DataLoader = require('dataloader'); // utility for batching and caching
const cors = require('cors'); // to set up cross-origin resource sharing
const schema = require('./schema'); // our data models

let app = express();

// Fetch data from the Pokemon API
const fetchPokemon = id =>
  fetch(`http://pokeapi.co/api/v2/pokemon/${id}`)
    .then(response => response.json())
    .catch(error => console.error(error));

// Optional for this demo, can comment out if don't need CORS enabled
var whitelist = [
  'http://localhost:3000',
];
var corsOptions = {
  origin: function (origin, callback) {
    var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  },
  credentials: true
};
app.use(cors(corsOptions));

// for now, redirect to localhost:3000/graphql
// eventually, can use the /graphql endpoint on front-end code
// (i.e in a componentDidMount method inside a React component to send
// a post request with desired fields)
app.get('/', (req, res, next) => {
  res.redirect('/graphql');
});

// mount express-graphql as a route handler
app.use('/graphql', graphqlHTTP(req => {

  // A batch loading function accepts an Array of keys
  // and returns a Promise which resolves to an Array of values
  const pokemonLoader = new DataLoader(keys =>
    Promise.all(keys.map(fetchPokemon)));

  // config options
  return {
    schema, // from schema.js
    context: {
      pokemonLoader, // for batching, caching
    },
    graphiql: true // GraphiQL tool to manually issue GraphQL queries
  };
}));

const port = 3000;
console.log(`Listening on port ${port}. Go to /graphql to test out query backend.`);
app.listen(port);
