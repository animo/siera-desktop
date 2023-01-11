import type { AnimoVariantTheme } from './layout/themes'
import type { ColorScheme, MantineThemeOverride, Tuple } from '@mantine/core'

import { animoLightTheme, animoDarkTheme } from './layout/themes'

export const toolboxTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  colors: colorScheme === 'dark' ? animoDarkTheme : animoLightTheme,

  defaultRadius: '0.25rem',

  white: '#F5F5F4',
  black: '#202223',

  primaryColor: 'primaryOne',

  fontFamily: 'Montserrat, sans-serif',

  components: {
    Title: {
      styles: (theme) => ({
        root: {
          color: theme.colors.textOne[7],
        },
      }),
    },

    Modal: {
      styles: () => ({
        title: {
          fontWeight: 700,
        },
      }),
    },
  },
})

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<keyof AnimoVariantTheme, Tuple<string, 10>>
  }
}
