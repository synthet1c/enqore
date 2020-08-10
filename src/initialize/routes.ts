import { Server } from "express";
import testRoute from "../modules/books/book";

export default async function initializeRoutes(app: Server) {

  app.use('/test', testRoute)

  return app
}