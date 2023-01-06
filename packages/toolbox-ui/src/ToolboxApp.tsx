import type { ColorScheme } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { toolboxTheme } from './ToolboxTheme'
import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { useConfigUnsafe } from './contexts/ConfigProvider'
import { PresentInviteModal } from './modals/PresentInviteModal'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

export const ToolboxApp = ({ router }: ToolboxAppProps) => {
  const { config, setColorScheme } = useConfigUnsafe()

  const colorScheme = config?.colorScheme ?? 'light'
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={toolboxTheme(colorScheme)}>
        <NotificationsProvider position="top-right">
          <ModalsProvider modals={{ presentInvite: PresentInviteModal }}>
            <GlobalErrorHandler>
              <RouterProvider router={router} />
            </GlobalErrorHandler>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
