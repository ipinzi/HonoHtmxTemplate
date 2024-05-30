import { app, db } from './app';
import {forgotPassword, login, logout, register} from "./auth";

export function InitiateRoutes() {

    app.post('/register', async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.json();
        let result = await register(username, password);
        return c.json({ success: result.success });
    });
    app.post('/login', async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.json();
        const session = c.get('session');
        const result = await login(username, password, session);
        return c.json({ success: result.success });
    });
    app.post('/forgotPassword', async (c) => {

        const { username, newPassword }: {username: string, newPassword: string} = await c.req.json();
        const result = await forgotPassword(username, newPassword);
        return c.json({success: result.success});
    });
    app.post('/logout', async (c) => {

        const session = c.get('session');
        const result = await logout(session);
        return c.json({success: result.success});
    });


}
