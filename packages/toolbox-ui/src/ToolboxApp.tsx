import type { RouterProviderProps } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { GlobalErrorHandler } from './components/GlobalErrorHandler'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

export const ToolboxApp = ({ router }: ToolboxAppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <NotificationsProvider position="top-right">
        <GlobalErrorHandler>
          <RouterProvider router={router} />
        </GlobalErrorHandler>
      </NotificationsProvider>
    </MantineProvider>
  )
}
