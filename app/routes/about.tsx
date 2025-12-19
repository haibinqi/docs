import { marked } from "marked";
import "github-markdown-css/github-markdown.css";
import { useEffect, useState } from "react";

const CONTENT = `
这是一个基于 Remix 构建的示例应用，旨在展示现代 Web 开发的最佳实践。

主要功能包括：
- Next.js 风格的文档系统
- 小学生口算生成器
- 基于文件系统的 Markdown 笔记

Built by Qihaibin correctly qihaibintc@gmail.com.
`;

export default function AboutPage() {
    const [htmlContent, setHtmlContent] = useState("");

    useEffect(() => {
        // Parse markdown on client side to avoid loader complexity for static text
        // or just use sync parse if version allows, but async is safer for v12+
        async function parse() {
            const html = await marked.parse(CONTENT);
            setHtmlContent(html);
        }
        parse();
    }, []);

    return (
        <div className="container relative pb-6 lg:gap-10 lg:pb-8 px-[5px] pt-[5px]">
            <article
                className="markdown-body w-full max-w-none"
                style={{ fontSize: '13px', backgroundColor: 'transparent' }}
                dangerouslySetInnerHTML={{ __html: htmlContent }}
            />
        </div>
    );
}
