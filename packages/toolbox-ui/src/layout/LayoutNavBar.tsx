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
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.animoWhite[4] : theme.colors.animoBlack[2],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.animoBlack[0] : theme.colors.animoLightgrey[0],
        color: theme.colorScheme === 'dark' ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.white : theme.black,
        },
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[2] : theme.colors.gray[6],
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      '&, &:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.white : theme.black,
        color: theme.colorScheme === 'dark' ? theme.black : theme.white,
        [`& .${icon}`]: {
          color: theme.colorScheme === 'dark' ? theme.black : theme.white,
        },
      },
    },

    footer: {
      borderTop: `1px solid ${theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[3]}`,
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
