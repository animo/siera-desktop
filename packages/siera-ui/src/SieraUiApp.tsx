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
import { ConfirmActionModal } from './modals/ConfirmActionModal'
import { CreateAgentModal } from './modals/CreateAgentModal'
import { CreateCredentialDefinitionModal } from './modals/CreateCredentialDefinitionModal'
import { CreateSchemaModal } from './modals/CreateSchemaModal'
import { IssueCredentialModal } from './modals/IssueCredentialModal'
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
