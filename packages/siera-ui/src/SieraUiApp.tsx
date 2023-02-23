import type { ColorScheme } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { sieraUiTheme } from './SieraUiTheme'
import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { UpdateNotifier } from './components/UpdateNotifier'
import { useConfigUnsafe } from './contexts/ConfigProvider'
import { CreateAgentModal } from './modals/CreateAgentModal'
import { PresentInviteModal } from './modals/PresentInviteModal'

interface SieraUiAppProps {
  router: RouterProviderProps['router']
}

export const SieraUiApp = ({ router }: SieraUiAppProps) => {
  const { config, setColorScheme } = useConfigUnsafe()

  const colorScheme = config?.colorScheme ?? 'light'
  const toggleColorScheme = (value?: ColorScheme) => setColorScheme(value || colorScheme === 'dark' ? 'light' : 'dark')

  return (
    <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={sieraUiTheme(colorScheme)}>
        <NotificationsProvider position="top-right">
          <ModalsProvider modals={{ presentInvite: PresentInviteModal, createAgent: CreateAgentModal }}>
            <GlobalErrorHandler>
              <UpdateNotifier />
              <RouterProvider router={router} />
            </GlobalErrorHandler>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
