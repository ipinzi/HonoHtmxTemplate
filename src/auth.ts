import { app, db } from './app';
import {Session} from "hono-sessions";

export interface SuccessData{
    success: boolean;
}
export async function register(username: string, password: string): Promise<SuccessData>  {
        const hashedPassword = await Bun.password.hash(password);
        const user = { username, password: hashedPassword };
        const result = await db.collection('users').insertOne(user);

        return {success: result.acknowledged};
}

export async function login(username: string, password: string, session: Session): Promise<SuccessData>   {
    const user = await db.collection('users').findOne({ username });

    console.log(username);
    console.log(password);
    if (user && await Bun.password.verify(password, user.password)) {
        session.set('userId', user._id);

        console.log("Login success");
        return { success: true };
    } else {
        console.log("Login failure");
        return { success: false };
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
