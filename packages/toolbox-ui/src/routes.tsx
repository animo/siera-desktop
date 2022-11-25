import type { RouteObject } from 'react-router-dom'

import React from 'react'

import { Layout } from './layout/Layout'
import { AgentSelectionScreen } from './pages/AgentSelectionScreen'
import { SetupScreen } from './pages/SetupScreen'
import { AgentHomeScreen } from './pages/agent/AgentHomeScreen'
import { ConnectionsScreen } from './pages/agent/connections/ConnectionsScreen'
import { CredentialsScreen } from './pages/agent/credentials/CredentialsScreen'

export const routes: RouteObject[] = [
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
          <Layout>
            <AgentHomeScreen />
          </Layout>
        ),
      },
      {
        path: 'connections',
        element: (
          <Layout>
            <ConnectionsScreen />
          </Layout>
        ),
      },
      {
        path: 'credentials',
        element: (
          <Layout>
            <CredentialsScreen />
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
