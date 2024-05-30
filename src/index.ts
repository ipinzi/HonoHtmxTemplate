import { app } from './app'
import {InitiateRoutes} from "./routes";
import "./pages/index";
import "./pages/test";

InitiateRoutes();

export default {
  port: 4000,
  fetch: app.fetch,
}