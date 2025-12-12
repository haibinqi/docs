import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/cloudflare";
import { useLoaderData, useFetcher, useActionData } from "@remix-run/react";
import { useState, useEffect, useRef } from "react";
import { Send, Loader2, Sparkles, Key, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const loader = async ({ context }: LoaderFunctionArgs) => {
    // Check if API key is available in environment variables
    const { env } = context.cloudflare as { env: { GEMINI_API_KEY?: string } };
    return json({ hasEnvKey: !!env.GEMINI_API_KEY });
};

export const action = async ({ request, context }: ActionFunctionArgs) => {
    const { env } = context.cloudflare as { env: { GEMINI_API_KEY?: string } };
    const formData = await request.formData();
    const prompt = formData.get("prompt") as string;
    const model = (formData.get("model") as string) || "gemini-1.5-pro";
    const apiKey = (formData.get("apiKey") as string) || env.GEMINI_API_KEY;

    if (!apiKey) {
        return json({ error: "API Key is required" }, { status: 400 });
    }

    if (!prompt?.trim()) {
        return json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            { text: prompt }
                        ]
                    }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Gemini API Error:", errorData);
            const errorMessage = (errorData as any).error?.message || "Failed to fetch from Gemini API";
            return json({ error: errorMessage }, { status: response.status });
        }

        const data: any = await response.json();

        // Extract text from response
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        if (!text) {
            return json({ error: "No text generated from Gemini." }, { status: 500 });
        }

        return json({ response: text });

    } catch (error: any) {
        console.error("Gemini Request Failed:", error);
        return json({ error: error.message || "Network error occurred" }, { status: 500 });
    }
};

export default function GeminiPage() {
    const { hasEnvKey } = useLoaderData<typeof loader>();
    const fetcher = useFetcher<typeof action>();

    // Load from localStorage if available
    const [apiKey, setApiKey] = useState("");

    useEffect(() => {
        const storedKey = localStorage.getItem("gemini_api_key");
        if (storedKey) setApiKey(storedKey);
    }, []);

    // Save to localStorage when changed
    const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setApiKey(newValue);
        localStorage.setItem("gemini_api_key", newValue);
    };

    const [model, setModel] = useState("gemini-1.5-pro");
    const [prompt, setPrompt] = useState("");

    const isSubmitting = fetcher.state === "submitting";
    const resultRef = useRef<HTMLDivElement>(null);

    // Scroll to result when data comes in
    useEffect(() => {
        if (fetcher.data?.response) {
            resultRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    }, [fetcher.data]);

    return (
        <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                    <Sparkles className="h-8 w-8 text-yellow-500" />
                    Gemini 智能对话
                </h1>
                <p className="text-muted-foreground">
                    直接与 Google Gemini 大模型进行对话，探索无限创意
                </p>
            </div>

            <div className="grid gap-6">
                {/* Configuration Card */}
                <Card>
                    <CardHeader>
                        <CardTitle>配置</CardTitle>
                        <CardDescription>设置 API 密钥和模型参数</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="grid gap-2">
                            <Label htmlFor="model">模型选择</Label>
                            <Select value={model} onValueChange={setModel}>
                                <SelectTrigger id="model">
                                    <SelectValue placeholder="Select model" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gemini-1.5-pro">Gemini 1.5 Pro (推荐)</SelectItem>
                                    <SelectItem value="gemini-1.5-flash">Gemini 1.5 Flash (快速)</SelectItem>
                                    <SelectItem value="gemini-pro">Gemini 1.0 Pro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {!hasEnvKey && (
                            <div className="grid gap-2">
                                <Label htmlFor="apiKey">API Key (未设置环境变量)</Label>
                                <div className="relative">
                                    <Key className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        id="apiKey"
                                        type="password"
                                        placeholder="输入 Google AI Studio Key"
                                        className="pl-9"
                                        value={apiKey}
                                        onChange={handleKeyChange}
                                    />
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Key将保存在本地浏览器中。
                                </p>
                            </div>
                        )}
                        {hasEnvKey && (
                            <div className="grid gap-2">
                                <Label>API Key</Label>
                                <div className="flex items-center h-10 px-3 rounded-md border bg-muted text-muted-foreground text-sm">
                                    Configured in Environment
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Input Area */}
                <div className="relative">
                    <fetcher.Form method="post" className="grid gap-4">
                        <input type="hidden" name="apiKey" value={apiKey} />
                        <input type="hidden" name="model" value={model} />

                        <div className="relative">
                            <Textarea
                                name="prompt"
                                placeholder="输入您的问题、创意或需求..."
                                className="min-h-[150px] p-4 text-base resize-y shadow-sm font-mono"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                                        fetcher.submit(e.currentTarget.form);
                                    }
                                }}
                            />
                            <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                                Cmd/Ctrl + Enter 发送
                            </div>
                        </div>

                        <Button
                            type="submit"
                            size="lg"
                            disabled={!prompt.trim() || isSubmitting || (!hasEnvKey && !apiKey)}
                            className="w-full md:w-auto md:ml-auto gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    思考中...
                                </>
                            ) : (
                                <>
                                    <Send className="h-4 w-4" />
                                    发送消息
                                </>
                            )}
                        </Button>
                    </fetcher.Form>
                </div>

                {/* Response Area */}
                {fetcher.data?.error && (
                    <Alert variant="destructive">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{fetcher.data.error}</AlertDescription>
                    </Alert>
                )}

                {fetcher.data?.response && (
                    <Card className="bg-muted/30 border-primary/20" ref={resultRef}>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-primary" />
                                Gemini 的回答
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none whitespace-pre-wrap leading-relaxed">
                                {fetcher.data.response}
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}
