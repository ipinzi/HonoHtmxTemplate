import { app } from './app'
import { register, login, forgotPassword, logout } from './auth'

register();
login();
forgotPassword();
logout();

export default {
  port: 4000,
  fetch: app.fetch,
}