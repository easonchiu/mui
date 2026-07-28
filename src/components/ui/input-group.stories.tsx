import type { Meta, StoryObj } from "@storybook/react-vite"
import { MailIcon, SearchIcon } from "lucide-react"

import { Field, FieldLabel } from "./field"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./input-group"

const meta = {
  title: "表单组件/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof InputGroup>

export default meta
type Story = StoryObj<typeof meta>

export const WithIcon: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel htmlFor="input-group-search">搜索</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput id="input-group-search" placeholder="搜索组件" />
      </InputGroup>
    </Field>
  ),
}

export const WithText: Story = {
  render: () => (
    <Field className="w-80">
      <FieldLabel htmlFor="input-group-email">邮箱</FieldLabel>
      <InputGroup>
        <InputGroupAddon>
          <MailIcon />
        </InputGroupAddon>
        <InputGroupInput id="input-group-email" placeholder="name" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>@mui.dev</InputGroupText>
        </InputGroupAddon>
      </InputGroup>
    </Field>
  ),
}
