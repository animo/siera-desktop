import type { MantineThemeOverride } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { PresentInviteModal } from './modals/PresentInviteModal'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

const mantineTheme: MantineThemeOverride = {
  colorScheme: 'dark',
  colors: {
    neutral: ['#333333'],
    secondary: ['#f5f5f5'],
    background: ['#F5F5F4'],
    animoWhite: ['#F5F5F4'],
    animoCoral: ['#EA6767'],
    animoBlue: ['#557EBA'],
    animoBlack: ['#202223'],
    animoLightgrey: ['#E5E5E5'],
    animoDarkgrey: ['#3A3B3B'],
  },

  fontFamily: 'Montserrat, sans-serif',
}

export const ToolboxApp = ({ router }: ToolboxAppProps) => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
      <NotificationsProvider position="top-right">
        <ModalsProvider modals={{ presentInvite: PresentInviteModal }}>
          <GlobalErrorHandler>
            <RouterProvider router={router} />
          </GlobalErrorHandler>
        </ModalsProvider>
      </NotificationsProvider>
    </MantineProvider>
  )
}
