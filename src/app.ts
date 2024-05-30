import { Hono } from 'hono';
import { MongoClient, Db } from 'mongodb';
import {Session, sessionMiddleware, CookieStore} from 'hono-sessions'

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