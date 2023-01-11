import { createStyles, UnstyledButton } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons'
import React from 'react'

import { useNavigation } from '../hooks/useNavigation'

const useStyles = createStyles((theme) => ({
  button: {
    color: theme.colors.primaryOne[7],
  },
}))

export const BackButton = () => {
  const { classes } = useStyles()
  const navigation = useNavigation()

  return (
    <UnstyledButton className={classes.button} onClick={() => navigation.goBack()}>
      <IconChevronLeft size={32} />
    </UnstyledButton>
  )
}
