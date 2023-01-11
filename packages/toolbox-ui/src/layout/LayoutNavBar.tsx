import type { Agent } from '@aries-framework/core'
import type { TablerIcon } from '@tabler/icons'

import { createStyles, Group, Navbar } from "@mantine/core";
import React, { useState } from 'react'

import { useNavigation } from '../hooks/useNavigation'

import { LayoutAvatar } from './LayoutAvatar'
import { LogoutAction } from "./actions/LogoutAction";
import { ColorSchemeSwitch } from "./actions/ColorSchemeSwitch";

export interface NavigationItem {
  name: string
  href: string
  icon: TablerIcon
}

interface LayoutNavigationProps {
  navigationItems: NavigationItem[]
  agent: Agent
}

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')

  return {
    navbar: {
      backgroundColor: theme.colors.backgroundOne[7],
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colors.textOne[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      // borderRadius: theme.radius.sm,
      fontWeight: 500,

      borderLeft: '4px solid transparent',

      '&:hover': {
        backgroundColor: theme.fn.rgba(theme.colors.primaryTwo[7], 0.05),
        borderLeft: `4px solid ${theme.fn.rgba(theme.colors.primaryTwo[7], 0.7)}`,

        [`& .${icon}`]: {
          color: theme.colors.textOne[7],
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colors.textOne[7],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.fn.rgba(theme.colors.primaryTwo[7], 0.1),
        borderLeft: `4px solid ${theme.colors.primaryTwo[7]}`,
      },
    },

    layoutAvatar: {
      paddingBottom: theme.spacing.xl,
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

  return (
    <Navbar py="md" width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section mx="md" className={classes.layoutAvatar}>
        <LayoutAvatar agent={agent} />
      </Navbar.Section>

      <Navbar.Section grow mt="xs">
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
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.name}</span>
          </a>
        ))}
      </Navbar.Section>

      <Navbar.Section className={classes.footer} mx="md">
        <Group position="apart">
          <LogoutAction />
          <ColorSchemeSwitch />
        </Group>
      </Navbar.Section>
    </Navbar>
  )
}
