import { createStyles, UnstyledButton } from '@mantine/core'
import { IconLogout } from '@tabler/icons'
import React from 'react'

import { useAgentManager } from '../../contexts/AgentManagerContext'
import { useNavigation } from '../../hooks/useNavigation'

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colors.textOne[6],
    marginLeft: theme.spacing.sm,
    cursor: 'pointer',
  },
}))

export const LogoutAction = () => {
  const { classes } = useStyles()
  const navigation = useNavigation()
  const { logout } = useAgentManager()

  const signOut = () => {
    logout()
    navigation.navigate('/')
  }

  return (
    <UnstyledButton className={classes.button} onClick={signOut}>
      <IconLogout stroke={1.5} />
    </UnstyledButton>
  )
}
