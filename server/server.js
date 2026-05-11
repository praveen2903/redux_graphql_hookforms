const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { getCurrentUser } = require('./middleware/authMiddleware');

const PORT = 5000;

async function startServer() {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();

  app.use(cors());
  app.use(bodyParser.json());

  app.use(
    '/graphql',    //single endpoint in graphql only
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        currentUser: getCurrentUser(req.headers.authorization || ''),
      }),
    })
  );

  app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Express and GraphQL server is running' });
  });

  app.listen(PORT, () => {
    console.log(`Server ready at http://localhost:${PORT}`);
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
    console.log('Demo login: demo@example.com / password123');
  });
}

startServer().catch((error) => {
  console.error('Error starting server:', error);
});