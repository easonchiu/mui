import type { Preview, Renderer } from "@storybook/react-vite"
import { withThemeByClassName } from "@storybook/addon-themes"

import "../src/index.css"

const preview: Preview = {
  decorators: [
    withThemeByClassName<Renderer>({
      themes: {
        light: "",
        dark: "dark",
      },
      defaultTheme: "light",
    }),
  ],
  parameters: {
    a11y: {
      test: "error",
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
}

export default preview
