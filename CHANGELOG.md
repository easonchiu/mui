# Changelog

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
