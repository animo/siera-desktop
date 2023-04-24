import type { ColorScheme } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { sieraUiTheme } from './SieraUiTheme'
import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { UpdateNotifierModal } from './components/UpdateNotifierModal'
import { useConfigUnsafe } from './contexts/ConfigProvider'
import {
  CreateAgentModal,
  PresentInviteModal,
  ConfirmActionModal,
  IssueCredentialModal,
  CreateSchemaModal,
  CreateCredentialDefinitionModal,
} from './modals'

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
          <ModalsProvider
            modals={{
              PresentInviteModal,
              CreateAgentModal,
              ConfirmActionModal,
              IssueCredentialModal,
              CreateSchemaModal,
              CreateCredentialDefinitionModal,
            }}
          >
            <GlobalErrorHandler>
              <UpdateNotifierModal />
              <RouterProvider router={router} />
            </GlobalErrorHandler>
          </ModalsProvider>
        </NotificationsProvider>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
