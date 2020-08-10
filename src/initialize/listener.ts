import { Server } from "express";

export default async function initializeListener(app: Server) {

  app.listen(4000, () => {
    // tslint:disable-next-line:no-console
    console.log('Server running on port 4000 bitch')
  });

  return app
}