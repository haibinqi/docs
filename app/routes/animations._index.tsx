import { json } from "@remix-run/cloudflare";

export default function AnimationsIndex() {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4 text-center">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">欢迎使用动画演示</h2>
        <p className="text-muted-foreground">
          请从左侧列表选择一个动画，或者点击 "+" 号添加新动画。
        </p>
      </div>
    </div>
  );
}
