import {JSX} from "hono/dist/types/jsx/base";

export function Layout(page : JSX.Element){
    return(
        <html lang="uk">
        <head>
            <title>Hello World! Website Title</title>
            <script src="https://unpkg.com/htmx.org@1.9.12"
                    integrity="sha384-ujb1lZYygJmzgSwoxRggbCHcjc0rB2XoQrxeTUQyRjrOnlCoYta87iKBWq3EsdM2"
                    crossOrigin="anonymous" />
        </head>
        <body>
        {page}
        </body>
        </html>
    );
}