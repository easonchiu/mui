# Changelog

## 0.1.22

- 统一基础组件使用 `border-border` 主题边框色，修复业务项目中边框颜色不一致的问题。
- 移除 Button 默认、描边和危险按钮的阴影。
- 统一 Select、DatePicker、RangePicker 弹层的边框、阴影和圆角裁切。
- 统一 Card、表单控件、菜单、Popover、Tabs、Switch、Checkbox、Radio 和 HoverCard 的边框主题。

## 0.1.21

- Toast 根节点显式使用 `border-border` 主题边框色，修复业务项目引入 Tailwind CSS 基础样式后通知边框显示为黑色的问题。

## 0.1.20

- TableHeader、TableRow 和 TableFooter 显式使用 `border-border` 主题边框色，修复业务项目引入 Tailwind CSS 基础样式后表格分隔线显示为黑色的问题。
- DataTable 自动继承修复，无需业务项目添加全局边框颜色兜底样式。

## 0.1.19

- 统一 Input、Textarea、Select、DatePicker、RangePicker 的边框、阴影和激活状态。
- 调整 Card、Button、Table、DataTable 与 Tabs 的视觉样式，减轻表格加载动画。
- 全局字体与 Portal 对齐，使用 Plus Jakarta Sans Variable 和 Inter，字体文件随包提供。
- Field 增加 `required`、`error`，并保留控件原有说明与错误提示的关联。
- 修复危险操作和警告提示的文字对比度。
- Storybook 升级到 10.6.6，深色示例改为独立预览，避免影响浅色文档页。

### 迁移说明

- 移除 `Grid`、`GridItem`，布局改用 CSS Grid 或 Tailwind 工具类。
- 移除 `FormItem`，使用 `Field`，支持标签、说明、必填和错误提示。
