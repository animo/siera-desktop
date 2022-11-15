import { routes } from '@animo/toolbox-ui/src/routes'
import React from 'react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'

// Because Electron doesn't support url routing we use the routing in memory
export const router = createMemoryRouter(routes)

// This component is to fix the Hot reload feature.
export const Base = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
