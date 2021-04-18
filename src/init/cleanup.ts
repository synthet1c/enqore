import { AppInitializer } from './modelInitilizer'

export default async function cleanup({ mongoClient }: AppInitializer) {
  process.on('SIGINT', function () {
    mongoClient
      .close()
      .then(function () {
        console.log('Mongo connection closed on app termination')
      })
      .then(() => process.exit(0))
  })
}