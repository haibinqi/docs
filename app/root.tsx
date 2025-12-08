import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from "@remix-run/react";
import "./tailwind.css";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <Meta />
                <Links />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased">
                <div className="relative flex min-h-screen flex-col">
                    <Header />
                    <div className="flex-1">{children}</div>
                    <Footer />
                </div>
                <ScrollRestoration />
                <Scripts />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}
