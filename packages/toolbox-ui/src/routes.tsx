import React from 'react'

import { Layout } from './layout/Layout'
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
        element: (
          <Layout title="Dashboard">
            <AgentHomeScreen />
          </Layout>
        ),
      },
    ],
  },
  {
    path: '/setup',
    element: <SetupScreen />,
  },
]
