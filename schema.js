const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql'); // Reference implementation of graphQL for JavaScript

// Creating a new Object Type, note self-documenting nature of the code
// static-types allow GraphiQL GUI to update with correct fields
// and returned value types
const PokemonType = new GraphQLObjectType({
  name: 'Pokemon',
  description: 'Basic Pokemon Object',

  // What data do we care about?
  // Go to: http://pokeapi.co/api/v2/pokemon/150 to see a sample JSON response
  // We can now selectively target what data we want the client to have access to

  // Resolve functions specify how the types and fields in the schema are
  // connected to potentially different backends, “How do I get the data for Pokemon?”

  // GraphQL resolve functions can contain any code
  // A GraphQL server can to talk other backends, even other GraphQL servers
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: json => json.id
    },
    name: {
      type: GraphQLString,
      resolve: json => json.name
    },
    weight: {
      type: GraphQLInt,
      resolve: json => json.weight
    },
    height: {
      type: GraphQLInt,
      resolve: json => json.height
    },
    moves: {
      type: new GraphQLList(GraphQLString), // return moves as a list of strings
      resolve: json => json.moves.map(key => key.move.name)
    }
  })
});

// Exporting our schema object
module.exports = new GraphQLSchema({
  // demonstrating query operation but can also define mutation
  // and subscription operations
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Query for basic Pokemon information',

    fields: () => ({
      Pokemon: {
        type: PokemonType, // using our custom defined type
        args: {
          id: { type: GraphQLInt } // defines the structure of accepted args
        },
        resolve: (root, args, context) => context.pokemonLoader.load(args.id)
      }
    })
  })
});
