import { Server } from 'express'
import dotenv from 'dotenv'
import { AppInitializer } from './modelInitilizer'

export default async function initEnvironmentVariables({ app }: AppInitializer) {
  dotenv.config()
}
