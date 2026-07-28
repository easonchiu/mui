# mui

基于 shadcn/ui、Base UI 和 Tailwind CSS 的共享 React UI 组件库，并保留
`base-sera` 官方组件源码与主题。

## 安装与使用

发布到包仓库后，在业务项目中安装：

```bash
pnpm add mui
```

组件入口会自动加载组件库样式，不需要额外导入 CSS：

```tsx
import { Button, Card, CardContent } from "mui"

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

## 已包含组件

除 Button 和 Card 外，当前还包含 Alert Dialog、Avatar、Badge、Breadcrumb、
Button Group、Checkbox、Combobox、Table、Dialog、Drawer、Dropdown Menu、
Field、Input、Input Group、Label、Pagination、Popover、Progress、Select、
Sheet、Skeleton、Slider、Spinner、Switch、Tabs、Textarea、Tooltip 和
Separator。

## 本地开发

```bash
pnpm install
pnpm storybook
```

Storybook 默认运行在 `http://localhost:6006`。每个组件都有独立的展示页面，
并按基础组件、表单组件、导航组件、数据展示、浮层组件和反馈组件分类。

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
