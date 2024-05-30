import { Hono } from 'hono';
import { MongoClient, Db } from 'mongodb';
import {Session, sessionMiddleware, CookieStore} from 'hono-sessions'
import {RequestData} from "./util";


const client = new MongoClient("mongodb://localhost:27017");
export const db: Db = client.db("mydb");

export const app = new Hono<{
    Variables: {
        session: Session,
        session_key_rotation: boolean
    }
}>();
const store = new CookieStore()

app.use('*', sessionMiddleware({
    store,
    encryptionKey: 'password_at_least_32_characters_long', // Required for CookieStore, recommended for others
    expireAfterSeconds: 900, // Expire session after 15 minutes of inactivity
    cookieOptions: {
        sameSite: 'Lax', // Recommended for basic CSRF protection in modern browsers
        path: '/', // Required for this library to work properly
        httpOnly: true, // Recommended to avoid XSS attacks
    },
}))

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