import { app, db } from './app';
import {forgotPassword, isLoggedIn, login, logout, register} from "./auth";

export function InitiateRoutes() {

    app.post('/register', async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.json();
        let result = await register(username, password);
        return c.json({ success: result.success });
    });
    app.post('/login',async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.parseBody();
        const session = c.get('session');
        const result = await login(username, password, session);
        if(result.success){
            return c.header('HX-Redirect', '/dashboard');
        }
        return c.html(result.html);
    });
    app.post('/forgotPassword', async (c) => {

        const { username, newPassword }: {username: string, newPassword: string} = await c.req.json();
        const result = await forgotPassword(username, newPassword);
        return c.json({success: result.success});
    });
    app.post('/logout', async (c) => {

        const result = await logout(c.get('session'));
        return c.json({success: result.success});
    });
    app.get('/dashboard', async (c) => {
        if(isLoggedIn(c.get('session'))){
            return c.html('<p>This is the DASHBOARD!</p>');
        }
        return c.redirect('/login');
    });

}
