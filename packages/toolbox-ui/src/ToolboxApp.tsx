import type { ColorScheme, MantineThemeOverride } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { useConfig, useConfigUnsafe } from './contexts/ConfigProvider'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

const toolboxTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  colors: {
    neutral: ['#333333'],
    secondary: ['#557EBA'],
    background: ['#F5F5F4'],
    animoWhite: ['#F5F5F4'],
    animoCoral: ['#EA6767'],
    animoBlue: ['#557EBA'],
    animoBlack: ['#202223'],
    animoLightgrey: ['#E5E5E5'],
    animoDarkgrey: ['#3A3B3B'],
  },

  fontFamily: 'Montserrat, sans-serif',
})

export const ToolboxApp = ({ router }: ToolboxAppProps) => {
  const { config, setColorScheme } = useConfigUnsafe()

  const colorScheme = config?.colorScheme ?? 'light'
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={toolboxTheme(colorScheme)}>
        <NotificationsProvider position="top-right">
          <GlobalErrorHandler>
            <RouterProvider router={router} />
          </GlobalErrorHandler>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
