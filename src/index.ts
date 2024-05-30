import { app } from './app'
import {InitiateRoutes} from "./routes";
import {RequestData} from "./util";

InitiateRoutes();

export default {
  port: 4000,
  fetch: app.fetch,
}


app.get('/', async (c, next) => {
  const session = c.get('session')

  if (session.get('counter')) {
    session.set('counter', session.get('counter') as number + 1)
  } else {
    session.set('counter', 1)
  }
  const data = await RequestData(
      "http://localhost:4000/login",
      {username: "username", password: "password"}
  );
  console.log("Success: ",data);

  return c.html(`<h1>You have visited this page ${ session.get('counter') } times</h1>`)
})