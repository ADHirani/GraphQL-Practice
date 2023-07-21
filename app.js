const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const bodyParser = require("body-parser");
const cors = require("cors");
const { WebSocketServer } = require("ws");
const { useServer } = require("graphql-ws/lib/use/ws");
const { createServer } = require("http");
const mySql = require("./config/db");
const Query = require("./graphql/resolvers/Query");
const Mutation = require("./graphql/resolvers/Mutation");
const Employee = require("./graphql/resolvers/Employee");
const typeDefs = require("./graphql/typeDefs");
const { makeExecutableSchema } = require("@graphql-tools/schema");
// const {
//   ApolloServerPluginDrainHttpServer,
// } = require("@apollo/server/plugin/drainHttpServer");
const Message = require("./graphql/resolvers/Message");
const Subscription = require("./graphql/resolvers/Subscription");

// server
(async () => {
  // Express and Http Server -----------------

  const app = express();
  const httpServer = createServer(app);

  // Express and Http Server -----------------

  // Middlewears ++++++++++++++++++++++

  app.use(bodyParser.json());
  app.use(
    cors({
      origin: "*",
    })
  );

  // Middlewears ++++++++++++++++++++++

  // WebSocket server ????????????????????????
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });

  const schema = makeExecutableSchema({
    typeDefs,
    resolvers: {
      Message: Message,
      Employee: Employee,
      Query: Query,
      Mutation: Mutation,
      Subscription: Subscription
    },
  });

  const wsServerCleanup = useServer({ schema }, wsServer);

  // WebSocket server ????????????????????????

  // Apollo Server &&&&&&&&&&&&&&&&&&&&&&&

  const apolloServer = new ApolloServer({
    schema,
    plugins: [
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose();
            },
          };
        },
      },
    ],
  });

  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));

  // Apollo Server &&&&&&&&&&&&&&&&&&&&&&&

  // Express Server and DB connection  OOOOOOOOOOOOOOOOOOOOO

  httpServer.listen(8000, () => {
    console.log("Server is running ! . . .");
    mySql.connect((err) => {
      if (err) {
        throw err;
      } else {
        console.log("connected with DB!");
      }
    });
  });

  // Express Server and DB connection  OOOOOOOOOOOOOOOOOOOOO
})();