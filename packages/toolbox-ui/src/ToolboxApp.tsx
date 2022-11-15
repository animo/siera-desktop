import type { RouterProviderProps } from 'react-router-dom'

import { MantineProvider } from '@mantine/core'
import React from 'react'
import { RouterProvider } from 'react-router-dom'

interface ToolboxAppProps {
  router: RouterProviderProps['router']
}

export const ToolboxApp = ({ router }: ToolboxAppProps) => {
  return (
    <>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  )
}
