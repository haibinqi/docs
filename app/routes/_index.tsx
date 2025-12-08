import { Link } from "@remix-run/react";
import { Button } from "@/components/ui/button";

export default function Index() {
    return (
        <div className="flex-1">
            <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
                    <Link
                        to="https://twitter.com/remix_run"
                        className="rounded-2xl bg-muted px-4 py-1.5 text-sm font-medium"
                        target="_blank"
                    >
                        Follow along on Twitter
                    </Link>
                    <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
                        The React Framework for the Web
                    </h1>
                    <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                        Used by some of the largest companies in the world, Next.js enables
                        you to create full-stack Web applications by extending the latest
                        React features, and integrating powerful Rust-based JavaScript
                        tooling for the fastest builds.
                    </p>
                    <div className="space-x-4">
                        <Button asChild size="lg">
                            <Link to="/docs">Get Started</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link to="https://github.com/remix-run/remix" target="_blank">
                                GitHub
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
            <section id="features" className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24">
                <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
                    <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl font-bold">
                        Features
                    </h2>
                    <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
                        This project is an exact replica of the Next.js site style but
                        built using Remix.
                    </p>
                </div>
                <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Next.js</h3>
                                <p className="text-sm text-muted-foreground">App Router, Server Components, Image Optimization.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">React</h3>
                                <p className="text-sm text-muted-foreground">Server and Client Components, Hooks.</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative overflow-hidden rounded-lg border bg-background p-2">
                        <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                            <div className="space-y-2">
                                <h3 className="font-bold">Turbo</h3>
                                <p className="text-sm text-muted-foreground">Pack 700x faster Rust-based Webpack replacement.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
