import type { AnimoVariantTheme } from './layout/themes'
import type { ColorScheme, MantineThemeOverride, Tuple } from '@mantine/core'

import { animoLightTheme, animoDarkTheme } from './layout/themes'

export const sieraUiTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  colors: colorScheme === 'dark' ? animoDarkTheme : animoLightTheme,

  defaultRadius: '0.25rem',

  white: '#F4F3F2',
  black: '#202223',

  primaryColor: 'primaryOne',

  fontFamily: 'Inter, sans-serif',

  components: {
    Title: {
      styles: (theme) => ({
        root: {
          color: theme.colors.textOne[7],
        },
      }),
    },

    Modal: {
      styles: (theme) => ({
        title: {
          fontWeight: 700,
          fontSize: '1.7rem',
        },
        modal: {
          borderRadius: '0.5rem',
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
        },
        header: {
          marginBottom: '0',
        },
      }),
    },

    TextInput: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
          border: `1px solid ${theme.colors.backgroundOne[5]}`,
          borderRadius: '0.5rem',
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
