export default function DocsIndex() {
    return (
        <div className="space-y-6">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Introduction
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Welcome to the documentation. This is a replication of the nextjscn.org
                style using Remix.
            </p>
            <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
                Features
            </h2>
            <ul className="my-6 ml-6 list-disc [&>li]:mt-2">
                <li>Remix Framework</li>
                <li>Tailwind CSS Styling</li>
                <li>Shadcn UI Components</li>
                <li>Dark Mode Support</li>
            </ul>
        </div>
    );
}
