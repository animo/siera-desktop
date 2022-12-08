import type { NavigationItem } from './LayoutNavBar'
import type { ReactNode } from 'react'

import { useAgent } from '@aries-framework/react-hooks'
import { AppShell, createStyles } from '@mantine/core'
import { IconHome, IconId, IconKey, IconPlugConnected } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'

import { LayoutNavBar } from './LayoutNavBar'

interface LayoutProps {
  children?: ReactNode
}

const navigationItems: NavigationItem[] = [
  { name: 'Dashboard', href: '/agent', icon: IconHome },
  { name: 'Connections', href: '/agent/connections', icon: IconPlugConnected },
  { name: 'Credentials', href: '/agent/credentials', icon: IconKey },
  { name: 'Proofs', href: '/agent/proofs', icon: IconId },
]

const useStyles = createStyles((theme) => ({
  appshell: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0],
  },
}))

export const Layout = ({ children }: LayoutProps) => {
  const { classes } = useStyles()
  const { agent, loading } = useAgent()

  if (loading) {
    return <Loading description="Loading Agent" />
  }

  if (!agent) {
    return <p>NO AGENT!</p>
  }

  return (
    <AppShell
      padding="md"
      className={classes.appshell}
      navbar={<LayoutNavBar navigationItems={navigationItems} agent={agent} />}
    >
      {children}
    </AppShell>
  )
}
