# docker-gql-gateway
gql-gateway wrapped around a Docker Image [`segpacto/gql-gateway`](https://hub.docker.com/r/segpacto/gql-gateway) that faciliates the creation of a graphql gateway and the data aggregations.

## Usage
Create and edit your `Dockerfile`
```
FROM segpacto/gql-gateway

COPY ./config.js config.js

CMD npm start
```

### Configuration options explained
Options available in `config.js`

| Name                   | Default                     |  Description    |
| ---------------------- | --------------------------- | --------------- |
| `endpointsList`        | `empty`                     | Contains a list of `json` swagger endpoints where to retrieve definitions to build the graphql schemas. `Minimum` one element |  
| `localSchema`          | `empty`                     | Schema that contains the aggregations that we want to establish between the REST API services. |
| `resolvers`            | `required`                  | [Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/) that implement delegation. |
| `apolloServerConfig`   | `empty`                     | Apollo Server configuration (https://www.apollographql.com/docs/apollo-server/api/apollo-server/#apolloserver)|
| `contextConfig`        | `empty`                     | Object that contains middlewares and also used to inject data into the Context (https://www.apollographql.com/docs/apollo-server/api/apollo-server/#apolloserver) |
| `logger`               | `console`                   | console as default logger |
