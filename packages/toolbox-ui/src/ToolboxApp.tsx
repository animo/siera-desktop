import type { ColorScheme, MantineThemeOverride } from '@mantine/core'
import type { RouterProviderProps } from 'react-router-dom'

import { ColorSchemeProvider, MantineProvider } from '@mantine/core'
import { ModalsProvider } from '@mantine/modals'
import { NotificationsProvider } from '@mantine/notifications'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

import { GlobalErrorHandler } from './components/GlobalErrorHandler'
import { useConfigUnsafe } from './contexts/ConfigProvider'
import { PresentInviteModal } from './modals/PresentInviteModal'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

const toolboxTheme = (colorScheme: ColorScheme): MantineThemeOverride => ({
  colorScheme: colorScheme,
  colors: {
    neutral: ['#333333', '#4D4D4D', '#666666', '#808080', '#999999', '#B3B3B3', '#CCCCCC', '#E6E6E6'],
    secondary: ['#F5F5F5', '#D3D3D3', '#B0B0B0', '#8E8E8E', '#6C6C6C', '#494949', '#272727', '#050505'],
    background: ['#F5F5F4', '#E8E8E8', '#D3D3D3', '#BFBFBF', '#A8A8A8', '#939393', '#7D7D7D', '#666666'],
    animoWhite: ['#F5F5F4', '#E8E8E8', '#D3D3D3', '#BFBFBF', '#A8A8A8', '#939393', '#7D7D7D', '#666666'],
    animoCoral: ['#EA6767', '#FF8989', '#FFA5A5', '#FFBFBF', '#FFD5D5', '#FFEAEA', '#FFFFFF', '#FFC6C6'],
    animoBlue: ['#557EBA', '#7B9BC9', '#A3B6D3', '#C7D3E8', '#EBF1FF', '#F4F6F9', '#F8F9FA', '#EDF0F4'],
    animoBlack: ['#202223', '#3D3D3D', '#4F4F4F', '#616161', '#737373', '#858585', '#979797', '#A9A9A9'],
    animoLightgrey: ['#E5E5E5', '#D3D3D3', '#BFBFBF', '#A8A8A8', '#939393', '#7D7D7D', '#666666', '#505050'],
    animoDarkgrey: ['#3A3B3B', '#2F2F2F', '#3D3D3D', '#4D4D4D', '#5C5C5C', '#6B6B6B', '#7A7A7A', '#898989'],
  },

  defaultRadius: '0.25rem',

  white: '#F5F5F4',
  black: '#202223',

  primaryColor: colorScheme === 'dark' ? 'animoWhite' : 'animoBlack',

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
