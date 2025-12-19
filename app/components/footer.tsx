export function Footer() {
    return (
        <footer className="border-t py-6 md:py-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row w-full px-0">
                <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                    Built by <span className="font-medium underline underline-offset-4">Qihaibin</span>.
                </p>
            </div>
        </footer>
    )
}
