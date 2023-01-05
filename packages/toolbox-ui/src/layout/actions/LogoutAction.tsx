import { createStyles, UnstyledButton } from '@mantine/core'
import { IconLogout } from '@tabler/icons'
import React from 'react'

import { useAgentManager } from '../../contexts/AgentManagerContext'
import { useNavigation } from '../../hooks/useNavigation'

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef('icon')

  return {
    link: {
      ...theme.fn.focusStyles(),
      display: 'flex',
      alignItems: 'center',
      textDecoration: 'none',
      fontSize: theme.fontSizes.sm,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[1] : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

      '&:hover': {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
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
  }
})

export const LogoutAction = () => {
  const { classes } = useStyles()
  const navigation = useNavigation()
  const { logout } = useAgentManager()

  const signOut = () => {
    logout()
    navigation.navigate('/')
  }

  return (
    <UnstyledButton className={classes.link} onClick={signOut}>
      <IconLogout className={classes.linkIcon} stroke={1.5} />
      <span>Logout</span>
    </UnstyledButton>
  )
}
