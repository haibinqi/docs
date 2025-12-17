import {
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    isRouteErrorResponse,
    useRouteError,
} from "@remix-run/react";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import type { LinksFunction } from "@remix-run/cloudflare";
import tailwindHref from "./tailwind.css?url";

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: tailwindHref },
];

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

export function ErrorBoundary() {
    const error = useRouteError();
    return (
        <html lang="en">
            <head>
                <title>Oh no!</title>
                <Meta />
                <Links />
            </head>
            <body className="min-h-screen bg-background font-sans antialiased p-4">
                <div className="container mx-auto py-8">
                    <h1 className="text-4xl font-bold mb-4">Application Error</h1>
                    <div className="bg-destructive/10 text-destructive p-4 rounded-md border border-destructive/20">
                        {isRouteErrorResponse(error) ? (
                            <>
                                <h2 className="text-xl font-semibold">{error.status} {error.statusText}</h2>
                                <p>{error.data}</p>
                            </>
                        ) : error instanceof Error ? (
                            <>
                                <h2 className="text-xl font-semibold">Error</h2>
                                <p className="font-mono mt-2">{error.message}</p>
                                <pre className="mt-4 p-2 bg-black/5 rounded text-xs overflow-auto">
                                    {error.stack}
                                </pre>
                            </>
                        ) : (
                            <h2 className="text-xl font-semibold">Unknown Error</h2>
                        )}
                    </div>
                </div>
                <Scripts />
            </body>
        </html>
    );
}

