import {app} from "../app";
import {Layout} from "./mainLayout";

app.get('/login', async (c, next) => {
    return c.html(Layout(<Page />));
});

function SomeOtherComponent() {
    return (
        <form hx-post="/login" hx-swap="beforeend" hx-trigger="submit">
            <input type="text" name="username" placeholder="Username" />
            <input type="password" name="password" placeholder="Password" />
            <button type="submit">Submit</button>
        </form>
    )
}
function LogoutButton(){
    return (
        <button hx-post="/logout">Logout</button>
    );
}

function Page() {
    return (
        <div>
            <SomeOtherComponent></SomeOtherComponent>
            <LogoutButton />
        </div>
    );
}