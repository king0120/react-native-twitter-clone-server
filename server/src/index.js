import express from 'express'
import { makeExecutableSchema } from 'graphql-tools'
import { createServer } from 'http'
import './config/db'
import constants from './config/constants'
import typeDefs from './graphql/schema'
import resolvers from './graphql/resolvers'
import middleware from './config/middleware'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { SubscriptionServer } from 'subscriptions-transport-ws'
import { execute, subscribe } from 'graphql'

const app = express()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

middleware(app)

const graphQLServer = createServer(app)

app.use('/graphiql', graphiqlExpress({
  endpointURL: constants.GRAPHQL_PATH,
  subscriptionsEndpoint: `ws://localhost:${constants.PORT}${constants.SUBSCRIPTIONS_PATH}`
}))

app.use(constants.GRAPHQL_PATH, graphqlExpress(req => ({
  schema,
  context: {
    user: req.user
  }
})))

// mocks().then(() => {
graphQLServer.listen(constants.PORT, err => {
  if (err) console.log(err)
  new SubscriptionServer({ // eslint-disable-line
    schema,
    execute,
    subscribe
  }, {
    server: graphQLServer,
    path: constants.SUBSCRIPTIONS_PATH
  })
  console.log('App listening on ' + constants.PORT)
})

// }).catch(err => console.log(err));
