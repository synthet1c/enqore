import { MongoClient } from 'mongodb'

import { AppInitializer } from './modelInitilizer'
import { tap } from 'rambda'
import { trace } from '../utils'

export default async function initMongoDB({ app }: AppInitializer): Promise<AppInitializer> {
  return MongoClient.connect(process.env.MONGO_DB_HOST, {
    useUnifiedTopology: true
  })
    .then((client) => ({
      app,
      Db: client.db(process.env.MONGO_DB_NAME),
      mongoClient: client
    }))
  .then(trace('MongoInit'))
}
