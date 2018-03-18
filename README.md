## Setup
- npm run start to start http://localhost:3000
- this will redirect you to /graphql, the interactive GraphiQL GUI

- Sample Query:
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

Change the id to get different Pokemon! The 'limit' argument limits the amount of
moves returned (optional)
