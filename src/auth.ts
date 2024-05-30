import { db } from './app';
import {Session} from "hono-sessions";

export interface SuccessData{
    success: boolean;
}
export interface HTMLData{
    success: boolean;
    html: string;
}
export async function register(username: string, password: string): Promise<SuccessData>  {
        const hashedPassword = await Bun.password.hash(password);
        const user = { username, password: hashedPassword };
        const result = await db.collection('users').insertOne(user);

        return {success: result.acknowledged};
}

export async function login(username: string, password: string, session: Session): Promise<HTMLData>   {
    const user = await db.collection('users').findOne({ username });

    if (user && await Bun.password.verify(password, user.password)) {
        session.set('userId', user._id);

        return { success: true, html: "<p>Logging yo ass in</p>"};
    } else {
        return { success: false, html: "<p>Your login failed bitch</p>"};
    }
}

export async function forgotPassword(username: string, newPassword: string) {
    const hashedPassword = await Bun.password.hash(newPassword);
    const result = await db.collection('users').updateOne({ username }, { $set: { password: hashedPassword } });

    return { success: result.modifiedCount > 0 };
}

export async function logout(session: Session) {
    session.deleteSession();

    return { success: true };
}

export function isLoggedIn(session: Session): boolean {
    const userId = session.get('userId');
    return userId != null;
}
