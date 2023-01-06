import type { Agent } from '@aries-framework/core'
import type { TablerIcon } from '@tabler/icons'

import { createStyles, Navbar } from '@mantine/core'
import React, { useState } from 'react'

import { useNavigation } from '../hooks/useNavigation'

import { LayoutActions } from './LayoutActions'
import { LayoutAvatar } from './LayoutAvatar'

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
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.fn.rgba(theme.colors.primaryOne[7], 0.1),
        color: theme.colors.textOne[7],

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
        backgroundColor: theme.colors.primaryOne[7],
        color: theme.colors.textTwo[7],
        [`& .${icon}`]: {
          color: theme.colors.textTwo[7],
        },
      },
    },

    footer: {
      borderTop: `1px solid ${theme.colors.backgroundOne[3]}`,
      paddingTop: theme.spacing.md,
    },
  }
})

export const LayoutNavBar = ({ navigationItems, agent }: LayoutNavigationProps) => {
  const { classes, cx } = useStyles()
  const navigation = useNavigation()
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <Navbar p="md" width={{ sm: 300 }} className={classes.navbar}>
      <Navbar.Section>
        <LayoutAvatar agent={agent} />
      </Navbar.Section>

      <Navbar.Section grow mt="xl">
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

      <Navbar.Section className={classes.footer}>
        <LayoutActions />
      </Navbar.Section>
    </Navbar>
  )
}
