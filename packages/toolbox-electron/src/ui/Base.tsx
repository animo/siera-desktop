import { RouterProvider } from 'react-router-dom'
import { router } from './Router'
import React from 'react'


// This component is to fix the Hot reload feature.
export const Base = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
