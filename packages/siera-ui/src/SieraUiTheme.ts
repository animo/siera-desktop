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

    Menu: {
      styles: (theme) => ({
        dropdown: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
        },
      }),
    },

    Modal: {
      styles: (theme) => ({
        title: {
          fontWeight: 700,
          fontSize: '1.7rem',
          padding: `0 ${theme.spacing.xl}px`,
        },
        modal: {
          border: `1px solid ${theme.colors.backgroundOne[6]}`,
          borderRadius: theme.radius.md,
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
          padding: `${theme.spacing.lg}px 0 !important`,
        },
        header: {
          marginBottom: '0',
        },
      }),
    },

    Divider: {
      styles: (theme) => ({
        root: {
          borderTopColor: `${theme.colors.backgroundOne[6]} !important`,
        },
      }),
    },

    TextInput: {
      styles: (theme) => ({
        input: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
          border: `1px solid ${theme.colors.backgroundOne[5]}`,
          borderRadius: '0.5rem',

          '&:focus': {
            borderColor: theme.colors.backgroundOne[4],
            boxShadow: `0 0 0 1px ${theme.colors.backgroundOne[4]}`,
          },
        },

        label: {
          fontWeight: 600,
          marginBottom: 5,
        },
      }),
    },

    Button: {
      styles: () => ({
        root: {
          '&:active': {
            transform: 'none',
          },
        },
      }),
    },

    Notification: {
      styles: (theme) => ({
        root: {
          backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
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
