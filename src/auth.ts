import { app, db } from './app';

export async function register() {
    app.post('/register', async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.json();
        const hashedPassword = await Bun.password.hash(password);
        const user = { username, password: hashedPassword };
        const result = await db.collection('users').insertOne(user);

        return c.json({ userId: result.insertedId });
    });
}

export async function login() {
    app.post('/login', async (c) => {

        const { username, password }: { username: string; password: string; } = await c.req.json();
        const user = await db.collection('users').findOne({ username });

        console.log(username);
        console.log(password);
        if (user && await Bun.password.verify(password, user.password)) {
            const session = c.get('session');
            session.set('userId', user._id);

            console.log("Sending success");
            return c.json({ success: true });
        } else {
            console.log("Sending failure");
            return c.json({ success: false });
        }
    });
}

export async function forgotPassword() {
    app.post('/forgotPassword', async (c) => {

        const { username, newPassword }: {username: string, newPassword: string} = await c.req.json();
        const hashedPassword = await Bun.password.hash(newPassword);
        const result = await db.collection('users').updateOne({ username }, { $set: { password: hashedPassword } });

        return c.json({ success: result.modifiedCount > 0 });
    });
}

export async function logout() {
    app.post('/logout', async (c) => {

        const session = c.get('session');
        session.deleteSession();

        return c.json( { success: true });
    });
}
