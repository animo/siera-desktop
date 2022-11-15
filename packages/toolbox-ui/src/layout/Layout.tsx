import type { ReactNode } from 'react'

import { useAgent } from '@aries-framework/react-hooks'
import { AppShell } from '@mantine/core'
import { IconHome } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'

import { LayoutNavBar } from './LayoutNavBar'

interface LayoutProps {
  title?: string
  children?: ReactNode
}

const navigationItems = [{ name: 'Dashboard', href: '#', icon: IconHome }]

export const Layout = ({ children }: LayoutProps) => {
  const agent = useAgent()

  if (agent.loading || agent.agent == undefined) {
    return <Loading description={'Loading Agent'} />
  }

  return (
    <>
      <AppShell padding="md" navbar={<LayoutNavBar navigationItems={navigationItems} agent={agent.agent} />}>
        {children}
      </AppShell>
    </>
  )
}
