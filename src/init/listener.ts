import { Server } from "express";
import { AppInitializer } from './modelInitilizer'

export default async function initListener({ app }: AppInitializer): Promise<AppInitializer> {

  app.listen(4008, () => {
    // tslint:disable-next-line:no-console
    console.log('Server running on port 4008')
  });

  return { app }
}