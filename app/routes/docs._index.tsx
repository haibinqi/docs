import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getNotesByTag, getDebugKeys } from "~/lib/content-reader.server";
import { FileText } from "lucide-react";

export async function loader() {
    const notesByTag = getNotesByTag();
    const debugKeys = getDebugKeys();
    return json({ notesByTag, debugKeys });
}

export default function DocsIndexPage() {
    const { notesByTag, debugKeys } = useLoaderData<typeof loader>();

    if (notesByTag.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-15rem)] text-muted-foreground">
                <FileText className="h-16 w-16 mb-4 opacity-20" />
                <p>暂无笔记</p>
                <p className="text-sm mt-2">在 <code className="bg-muted px-2 py-1 rounded">content/</code> 目录创建 md 文件</p>

                <div className="mt-8 p-4 bg-muted/20 rounded text-xs font-mono text-left max-w-lg w-full overflow-auto max-h-64">
                    <p className="font-bold mb-2">Debug Info (Found {debugKeys.length} files):</p>
                    <pre>{JSON.stringify(debugKeys, null, 2)}</pre>
                </div>
            </div>
        );
    }

    return (
        <div className="mt-4 text-[13px] text-muted-foreground">
            <p>从左侧选择一个笔记查看正文，右侧显示该页目录。</p>
        </div>
    );
}
