import React from 'react'

import { AgentHomeScreen } from './pages/AgentHomeScreen'
import { AgentSelectionScreen } from './pages/AgentSelectionScreen'
import { SetupScreen } from './pages/SetupScreen'

export const routes = [
  {
    path: '/',
    element: <AgentSelectionScreen />,
  },
  {
    path: '/agent',
    children: [
      {
        index: true,
        element: <AgentHomeScreen />,
      },
    ],
  },
  {
    path: '/setup',
    element: <SetupScreen />,
  },
]
