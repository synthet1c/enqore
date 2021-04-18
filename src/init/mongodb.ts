import { MongoClient } from 'mongodb'

import { AppInitializer } from './modelInitilizer'
import { tap } from 'rambda'
import { trace } from '../utils'

export async function initMongoDB({
  app,
}: AppInitializer): Promise<AppInitializer> {
  const client = await MongoClient.connect(process.env.MONGO_DB_HOST, {
    useUnifiedTopology: true,
  })

  return {
    app,
    Db: client.db(process.env.MONGO_DB_NAME),
    mongoClient: client,
  }
}

export async function wipeMongoDBCollections({ Db }: AppInitializer) {
  await Promise.all([Db.collection('users').drop()])
  await Db.collection('users').insertOne({
    firstName: 'Andrew',
    lastName: 'Fountain',
    nickname: 'foonta',
    login: 'founts',
    password: 'p@55w0rd!',
    email: 'founts24@gmail.com',
    addresses: [
      {
        number: 38,
        unit: 1,
        street: 'Dalgety',
        type: 'Street',
        suburb: 'St Kilda',
        postcode: 3182,
      },
      {
        number: 348,
        street: 'High',
        suburb: 'Windsor',
        type: 'Street',
        postcode: 3181,
      },
    ],
  })
}

export async function cleanupMongoDBConnection({
  mongoClient,
}: AppInitializer) {
  process.on('SIGINT', function () {
    mongoClient
      .close()
      .then(function () {
        console.log('Mongo connection closed on app termination')
      })
      .then(() => process.exit(0))
  })
}
