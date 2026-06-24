import React, { useEffect } from "react";
import type { Preview } from "@storybook/react";
import { UIConfigProvider } from "../src/context/UIConfigContext";
import "../src/index.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story, context) => {
      const { theme, locale } = context.globals;

      useEffect(() => {
        const htmlElement = document.documentElement;
        
        // Handle theme
        if (theme === "dark") {
          htmlElement.classList.add("dark");
        } else {
          htmlElement.classList.remove("dark");
        }

        // Handle locale
        htmlElement.lang = locale;
      }, [theme, locale]);

      return (
        <UIConfigProvider theme={theme} language={locale}>
          <Story />
        </UIConfigProvider>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "circlehollow", title: "Light" },
          { value: "dark", icon: "circle", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
    locale: {
      description: "Internationalization locale",
      defaultValue: "zh-CN",
      toolbar: {
        title: "Locale",
        icon: "globe",
        items: [
          { value: "zh-CN", right: "🇨🇳", title: "简体中文" },
          { value: "zh-TW", right: "🇭🇰", title: "繁體中文" },
          { value: "en-US", right: "🇺🇸", title: "English" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;
