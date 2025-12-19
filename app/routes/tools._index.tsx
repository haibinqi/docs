import { redirect } from "@remix-run/cloudflare";

export const loader = async () => {
    return redirect("/tools/prompts");
};

export default function ToolsIndex() {
    return null;
}
