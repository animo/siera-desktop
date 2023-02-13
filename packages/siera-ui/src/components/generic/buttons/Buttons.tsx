import type { ButtonProps } from '@mantine/core'

import { Button, createStyles } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons'
import React from 'react'

import { useNavigation } from '../../../hooks/useNavigation'

interface ClickAble {
  onClick?: () => void
}

const useStyles = createStyles((theme) => ({
  primary: {
    backgroundColor: theme.colors.primaryOne[7],
    color: theme.colors.textTwo[7],
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: theme.colors.primaryOne[6],
    },
  },

  secondary: {
    backgroundColor: theme.colors.secondaryOne[7],
    color: theme.colors.textTwo[0],
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: theme.colors.secondaryOne[6],
    },
  },

  smallBackButton: {
    color: theme.colors.textOne[7],
    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.textOne[7], 0.1),
    },
  },
}))

export const PrimaryButton = (props: ButtonProps & ClickAble) => {
  const { classes, cx } = useStyles()

  return <Button {...props} className={cx(classes.primary, props.className)} />
}

export const SecondaryButton = (props: ButtonProps & ClickAble) => {
  const { classes, cx } = useStyles()

  return <Button {...props} className={cx(classes.secondary, props.className)} />
}

export const DangerButton = (props: ButtonProps & ClickAble) => {
  return <Button color="danger" variant="subtle" {...props} />
}

export const SmallBackButton = (props: ButtonProps & ClickAble) => {
  const { classes, cx } = useStyles()
  const { goBack } = useNavigation()

  return (
    <Button
      variant="subtle"
      size="xs"
      px="xs"
      onClick={props.onClick || goBack}
      {...props}
      leftIcon={<IconChevronLeft />}
      className={cx(classes.smallBackButton, props.className)}
    >
      Back
    </Button>
  )
}
