import type { ButtonProps } from '@mantine/core'

import { Button, createStyles } from '@mantine/core'
import React from 'react'

interface ClickAble {
  onClick?: () => void
}

const useStyles = createStyles((theme) => ({
  primary: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.animoWhite[0] : theme.colors.animoBlack[0],
    color: theme.colorScheme === 'dark' ? theme.colors.animoBlack[0] : theme.colors.animoWhite[0],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.animoWhite[0] : theme.colors.animoBlack[0],
    },
  },

  secondary: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.animoBlack[0] : theme.colors.animoWhite[0],
    color: theme.colorScheme === 'dark' ? theme.colors.animoWhite[0] : theme.colors.animoBlack[0],
  },
}))

export const PrimaryButton = (props: ButtonProps & ClickAble) => {
  const { classes, cx } = useStyles()

  return <Button color="primary" {...props} className={cx(classes.primary, props.className)} />
}

export const SecondaryButton = (props: ButtonProps & ClickAble) => {
  const { classes, cx } = useStyles()

  return <Button color="secondary" {...props} className={cx(classes.secondary, props.className)} />
}

export const DangerButton = (props: ButtonProps & ClickAble) => {
  return <Button color="red" variant="subtle" {...props} />
}
