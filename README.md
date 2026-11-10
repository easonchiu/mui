# mui

基于 shadcn/ui、Base UI 和 Tailwind CSS 的共享 React UI 组件库，并保留
`base-sera` 官方组件源码与主题。

## 安装与使用

当前通过 GitHub tag 发布，在业务项目中安装指定版本：

```bash
pnpm add github:easonchiu/mui#v0.1.19
```

使用 pnpm 10 时，Git 依赖需要构建授权。先在业务项目的
`pnpm-workspace.yaml` 中加入以下配置，再执行安装：

```yaml
allowBuilds:
  mui: true
```

pnpm 11 要求包含 Git 来源的精确依赖标识。如果安装提示
`ERR_PNPM_GIT_DEP_PREPARE_NOT_ALLOWED`，按错误提示中的精确标识配置
`allowBuilds` 后重试。

组件入口会自动加载组件库样式，不需要额外导入 CSS：

```tsx
import { Button, Card } from "mui"

export function Example() {
  return (
    <Card title="操作确认">
      <Button>确定</Button>
    </Card>
  )
}
```

组件库与 Portal 使用相同的全局字体：优先使用 Plus Jakarta Sans Variable，
回退到 Inter Variable；中文依次使用苹方、冬青黑体和微软雅黑。
字体文件随组件库样式打包，无需额外引入或请求外部字体服务。

使用 Tailwind CSS v4 的业务项目可以直接导入组件库的完整主题配置：

```css
@import "tailwindcss";
@import "mui/theme.css";
```

`mui/theme.css` 保留未经预编译的 `@theme inline` 和暗色模式变体，业务项目因此
可以直接使用 `ring-ring2`、`text-foreground`、`rounded-sm` 等主题工具类。
组件运行时使用的 `:root` 和 `.dark` 变量值仍由 `mui/styles.css` 提供。

常见业务场景提供接近 antd 的简化 API：

```tsx
import { Button, Field, Input, Modal, Select } from "mui"

<Select
  options={[
    { label: "启用", value: "enabled" },
    { label: "停用", value: "disabled" },
  ]}
  placeholder="请选择状态"
/>

<Field label="名称" required description="请输入容易识别的名称。" error={nameError}>
  <Input value={name} onChange={(event) => setName(event.target.value)} />
</Field>

<Modal
  title="编辑信息"
  open={open}
  onOpenChange={setOpen}
  onOk={handleSave}
  confirmLoading={saving}
>
  ...
</Modal>
```

Select 的复杂场景仍可使用 `SelectRoot`、`SelectTrigger` 等内部结构组件。
浮层组件会自动处理 Trigger 和 Content，只需直接传入触发元素与内容。

Field 统一提供标签、说明、必填标记和错误提示。`error` 优先于 `description`
展示，并自动为子控件设置 `aria-invalid`；`required` 同时传递给子控件。

## 已包含组件

除 Button 和 Card 外，当前还包含 Alert Dialog、Avatar、Badge、Breadcrumb、
Calendar、Checkbox、Combobox、Data Table、Date Picker、Range Picker、Dialog、Modal、Drawer、
Context Menu、Dropdown Menu、Field、Hover Card、Input、Pagination、
Popover、Progress、Radio、Select、Skeleton、Slider、Spinner、Switch、
Tabs、Textarea、Toast、Tooltip 和 Separator。

`ContextMenu` 默认响应右键。需要在画布等场景同时响应双击时，设置
`openOnDoubleClick`，菜单会在双击位置打开。

拖拽落点等需要由业务决定菜单位置的场景，可以通过 ref 调用
`openAt({ x, y })`，坐标使用浏览器视口坐标。

Toast 需要在应用根部渲染一次 `Toaster`，之后可在任意位置使用
`toast.success()`、`toast.error()` 或 `toast.add()` 发送通知。通知默认显示在
页面右上角。

## 本地开发

```bash
pnpm install
pnpm storybook
```

Storybook 默认运行在 `http://localhost:6006`。每个组件都有独立的展示页面，
并按基础组件、表单组件、导航组件、数据展示、浮层组件和反馈组件分类。

首次运行浏览器测试前需要安装 Chromium：

```bash
pnpm exec playwright install chromium
```

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

## 版本发布

版本通过 `easonchiu/mui` 仓库的 `vX.Y.Z` tag 发布。不要使用 `npm publish`，
npm 公共仓库中的同名 `mui` 包不属于本项目。

发布前更新 `package.json` 版本号、上面的安装版本和 `CHANGELOG.md`，
完成验证与打包检查，然后提交本次变更，为该提交创建对应版本 tag，
将提交与 tag 一起推送到 `origin`。安装 Git 依赖时，`prepack` 会构建 `dist`。
