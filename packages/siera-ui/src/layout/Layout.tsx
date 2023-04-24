import type { NavigationItem } from './LayoutNavBar'
import type { ReactNode } from 'react'

import { useAgent } from '@aries-framework/react-hooks'
import { AppShell } from '@mantine/core'
import React from 'react'

import { Loading } from '../components/Loading'

import { LayoutNavBar } from './LayoutNavBar'

interface LayoutProps {
  children?: ReactNode
}

const navigationItems: NavigationItem[] = [
  { name: 'Connections', href: '/agent/connections' },
  { name: 'Credentials', href: '/agent/credentials' },
  { name: 'Proofs', href: '/agent/proofs' },
  { name: 'Dids', href: '/agent/dids' },
  { name: 'AnonCreds', href: '/agent/anoncreds' },
]

export const Layout = ({ children }: LayoutProps) => {
  const { agent, loading } = useAgent()

  if (loading) {
    return <Loading description="Loading Agent" />
  }

  if (!agent) {
    return <p>NO AGENT!</p>
  }

  return (
    <AppShell
      padding="xl"
      navbar={<LayoutNavBar navigationItems={navigationItems} agent={agent} />}
      styles={{ main: { width: '100%' } }}
    >
      {children}
    </AppShell>
  )
}
