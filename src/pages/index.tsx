import {app} from "../app";
import {RequestData} from "../util";
import {Session} from "hono-sessions";
import {Layout} from "./mainLayout";

let session : Session;

app.get('/', async (c, next) => {
    session = c.get('session')

    if (session.get('counter')) {
        session.set('counter', session.get('counter') as number + 1)
    } else {
        session.set('counter', 1)
    }
    /*const data = await RequestData(
        "http://localhost:4000/login",
        {username: "username", password: "password"}
    );*/
    //console.log("Success: ",data);

    return c.html(Layout(<Page />));
})

function Page() {
    return (
        <h1>You have visited this page {session.get('counter')} times</h1>
    );
}