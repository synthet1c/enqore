import { Server } from "express";
import dotenv from 'dotenv'

export default async function initEnvironmentVariables(app: Server) {
  dotenv.config()
  return app
}