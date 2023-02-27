import type { Agent } from '@aries-framework/core'

import { ActionIcon, createStyles, Group, Menu, Navbar, UnstyledButton, useMantineColorScheme } from '@mantine/core'
import { IconChevronDown, IconLogout } from '@tabler/icons'
import React, { useState } from 'react'

import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'

import { LayoutAvatar } from './LayoutAvatar'

export interface NavigationItem {
  name: string
  href: string
}

interface LayoutNavigationProps {
  navigationItems: NavigationItem[]
  agent: Agent
}

const useStyles = createStyles((theme) => {
  return {
    navbar: {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      color: theme.colors.textOne[3],
      padding: `7px ${theme.spacing.sm}px`,
      margin: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.md,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.rgba(theme.colors.primaryOne[7], 0.05),
      },
    },

    linkActive: {
      '&, &:hover': {
        color: theme.colors.textOne[7],
        backgroundColor: theme.fn.rgba(theme.colors.primaryOne[7], 0.07),
      },
    },

    layoutAvatar: {
      paddingBottom: theme.spacing.xl,
    },

    logoutButton: {
      color: theme.colors.textOne[6],
      marginLeft: theme.spacing.sm,
      cursor: 'pointer',
    },

    footer: {
      paddingTop: theme.spacing.md,
    },
  }
})

export const LayoutNavBar = ({ navigationItems, agent }: LayoutNavigationProps) => {
  const { classes, cx } = useStyles()
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)
  const { toggleColorScheme } = useMantineColorScheme()
  const { logout } = useAgentManager()

  const signOut = () => {
    logout()
    navigation.navigate('/')
  }

  return (
    <Navbar py="md" width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section mx="md" className={classes.layoutAvatar}>
        <Group position="apart">
          <LayoutAvatar agent={agent} />
          <Menu shadow="md" width={200} position="bottom-end">
            <Menu.Target>
              <ActionIcon>
                <IconChevronDown />
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item onClick={() => toggleColorScheme()}>Switch theme</Menu.Item>
              <Menu.Item onClick={() => signOut()}>Logout</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Navbar.Section>

      <Navbar.Section grow>
        {navigationItems.map((item, index) => (
          <a
            className={cx(classes.link, { [classes.linkActive]: index === activeIndex })}
            href={item.href}
            key={item.name}
            onClick={(event) => {
              event.preventDefault()
              navigation.unSafeNavigate(item.href)
              setActiveIndex(index)
            }}
          >
            {item.name}
          </a>
        ))}
      </Navbar.Section>

      <Navbar.Section className={classes.footer} mx="md">
        <UnstyledButton className={classes.logoutButton} onClick={signOut}>
          <IconLogout stroke={1.5} />
        </UnstyledButton>
      </Navbar.Section>
    </Navbar>
  )
}
