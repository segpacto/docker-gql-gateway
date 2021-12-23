const gateway = require('gql-gateway')
const fs = require('fs')

const path = './config.js'

if (!fs.existsSync(path)) {
  throw new Error('There is no configuration file.')
}

const inputConfiguration = require(path)

const defaultConfiguration = require('./configs/default')

const mergedConfiguration = { ...defaultConfiguration, ...inputConfiguration }

const {
  port,
  localSchema,
  resolvers,
  endpointsList,
  apolloServerConfig,
  contextConfig,
  logger
} = mergedConfiguration

if (!endpointsList.length) {
  throw new Error('Endpoint list should not be empty')
}

gateway({
  localSchema,
  resolvers,
  endpointsList,
  apolloServerConfig,
  contextConfig,
  logger
})
  .then(server => server.listen(port))
  .then(console.log(`Service is now running at port: ${port}`))
  .catch(err => console.log(err))
