import type { RouteObject } from 'react-router-dom'

import React from 'react'

import { Layout } from './layout/Layout'
import { AgentSelectionScreen } from './pages/AgentSelectionScreen'
import { SetupScreen } from './pages/SetupScreen'
import { AgentHomeScreen } from './pages/agent/AgentHomeScreen'
import { ConnectionDetailsScreen } from './pages/agent/connections/ConnectionDetailsScreen'
import { ConnectionsScreen } from './pages/agent/connections/ConnectionsScreen'
import { CredentialsScreen } from './pages/agent/credentials/CredentialsScreen'
import { ProofsScreen } from './pages/agent/proofs/ProofsScreen'

export const routeUrls = [
  '/',
  '/setup',
  '/agent',
  '/agent/connections',
  '/agent/connections/{connectionId}',
  '/agent/credentials',
  '/agent/proofs',
] as const

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
        path: 'connections/:connectionId',
        element: (
          <Layout>
            <ConnectionDetailsScreen />
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
      {
        path: 'proofs',
        element: (
          <Layout>
            <ProofsScreen />
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
