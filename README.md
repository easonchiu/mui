# @yaoshang/ui

药商云共享 React UI 组件库。组件基于 shadcn/ui、Base UI、Tailwind CSS，
并保留 `base-sera` 官方组件源码与主题。

## 安装与使用

发布到包仓库后，在业务项目中安装：

```bash
pnpm add @yaoshang/ui
```

组件入口会自动加载组件库样式，不需要额外导入 CSS：

```tsx
import { Button, Card, CardContent } from "@yaoshang/ui"

export function Example() {
  return (
    <Card>
      <CardContent>
        <Button>确定</Button>
      </CardContent>
    </Card>
  )
}
```

业务项目可以在组件库样式之后覆盖 shadcn CSS 变量，定制品牌主题。

## 本地开发

```bash
pnpm install
pnpm storybook
```

Storybook 默认运行在 `http://localhost:6006`。

## 添加组件

在组件库目录运行：

```bash
pnpm dlx shadcn@latest add dialog
```

检查生成的组件后，在 `src/index.ts` 中补充公开导出，并为组件添加 Storybook
故事。

更新已有组件前先检查上游差异：

```bash
pnpm dlx shadcn@latest add button --dry-run
pnpm dlx shadcn@latest add button --diff button.tsx
```

## 验证与打包

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm build:storybook
pnpm pack
```
