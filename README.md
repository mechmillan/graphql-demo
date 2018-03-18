## Setup
- __npm run start__ to start http://localhost:3000
- this will redirect you to /graphql, the interactive GraphiQL GUI

- Sample Queries (paste these into the GUI and feel free to modify):
```js
{
  Pokemon(id: 25){
    name
    weight
    height
    moves(limit: 5)
  }
}
```
```js
{
  Pokemon(id: 4){
    id
    name
    weight
    moves
  }
}
```

Change the id (required) to get a different Pokemon! The 'limit' argument
limits the amount of moves returned (optional). Also, note that you can include
or exclude fields as desired to limit the response results. In a real application,
this could be helpful for different UI components based on your data needs.

Be sure to check out the self-generated documentation in the GraphiQL GUI!
