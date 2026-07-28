import type { Meta, StoryObj } from "@storybook/react-vite"

import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "./combobox"
import { Field, FieldLabel } from "./field"

const frameworks = ["Next.js", "Vite", "Remix", "Astro"]

const meta = {
  title: "表单组件/Combobox",
  component: Combobox,
  tags: ["autodocs"],
} satisfies Meta<typeof Combobox>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Field className="w-72">
      <FieldLabel>技术栈</FieldLabel>
      <Combobox items={frameworks}>
        <ComboboxInput
          aria-label="技术栈"
          placeholder="搜索框架"
          showTrigger={false}
        />
        <ComboboxContent>
          <ComboboxEmpty>没有匹配结果</ComboboxEmpty>
          <ComboboxList>
            {frameworks.map((framework) => (
              <ComboboxItem key={framework} value={framework}>
                {framework}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </Field>
  ),
}
