import type { NavigationItem } from './LayoutNavBar'
import type { ReactNode } from 'react'

import { useAgent } from '@aries-framework/react-hooks'
import { AppShell } from '@mantine/core'
import { IconHome, IconPlugConnected } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'

import { LayoutNavBar } from './LayoutNavBar'

interface LayoutProps {
  children?: ReactNode
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/agent', icon: IconHome },
  { name: 'Connections', href: '/agent/connections', icon: IconPlugConnected },
]

export const Layout = ({ children }: LayoutProps) => {
  const { agent, loading } = useAgent()

  if (loading) {
    return <Loading description={'Loading Agent'} />
  }

  if (!agent) {
    return <p>NO AGENT!</p>
  }

  return (
    <AppShell padding="md" navbar={<LayoutNavBar navigationItems={navigationItems} agent={agent} />}>
      {children}
    </AppShell>
  )
}
