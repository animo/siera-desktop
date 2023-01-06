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
      color: theme.colors.textOne[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,
      cursor: 'pointer',

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
