import type { RouteObject } from 'react-router-dom'

import React from 'react'

import { Layout } from './layout/Layout'
import { AgentSelectionScreen } from './pages/AgentSelectionScreen'
import { AgentHomeScreen } from './pages/agent/AgentHomeScreen'
import { ConnectionDetailsScreen } from './pages/agent/connections/ConnectionDetailsScreen'
import { ConnectionsScreen } from './pages/agent/connections/ConnectionsScreen'
import { CredentialsDetailsScreen } from './pages/agent/credentials/CredentialsDetailsScreen'
import { CredentialsScreen } from './pages/agent/credentials/CredentialsScreen'
import { DidsScreen } from './pages/agent/dids/DidsScreen'
import { ProofDetailsScreen } from './pages/agent/proofs/ProofDetailsScreen'
import { ProofsScreen } from './pages/agent/proofs/ProofsScreen'

export const routeUrls = [
  '/',
  '/agent',
  '/agent/connections',
  '/agent/connections/{connectionId}',
  '/agent/credentials',
  '/agent/credentials/{credentialId}',
  '/agent/proofs',
  '/agent/proofs/{proofId}',
  '/agent/dids',
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
        path: 'credentials/:credentialId',
        element: (
          <Layout>
            <CredentialsDetailsScreen />
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
      {
        path: 'proofs/:proofId',
        element: (
          <Layout>
            <ProofDetailsScreen />
          </Layout>
        ),
      },
      {
        path: 'dids',
        element: (
          <Layout>
            <DidsScreen />
          </Layout>
        ),
      },
    ],
  },
]
