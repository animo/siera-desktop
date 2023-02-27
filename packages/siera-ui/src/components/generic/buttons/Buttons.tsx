import type { ButtonProps } from '@mantine/core'
import type { ButtonHTMLAttributes } from 'react'

import { Button, createStyles } from '@mantine/core'
import { IconArrowLeft, IconPlus } from '@tabler/icons'
import React from 'react'

import { useNavigation } from '../../../hooks/useNavigation'

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
    color: theme.colors.textOne[3],

    '&:hover': {
      backgroundColor: 'transparent',
      color: theme.colors.textOne[2],
    },
  },

  smallBackButton: {
    color: theme.colors.textOne[7],
    fontSize: theme.fontSizes.md,
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
}))

type StandardButton = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>

type PrimaryButtonProps = StandardButton & {
  withPlusIcon?: boolean
}

export const PrimaryButton = (props: PrimaryButtonProps) => {
  const { classes, cx } = useStyles()
  const { withPlusIcon } = props

  const plusButton = withPlusIcon && <IconPlus size={16} stroke={3} />

  return <Button leftIcon={plusButton} {...props} className={cx(classes.primary, props.className)} />
}

export const SecondaryButton = (props: StandardButton) => {
  const { classes, cx } = useStyles()

  return <Button variant="subtle" {...props} className={cx(classes.secondary, props.className)} />
}

export const DangerButton = (props: StandardButton) => {
  return <Button color="danger" variant="subtle" {...props} />
}

export const SmallBackButton = (props: StandardButton) => {
  const { classes, cx } = useStyles()
  const { goBack } = useNavigation()

  return (
    <Button
      variant="subtle"
      size="xs"
      px="xs"
      onClick={props.onClick || goBack}
      {...props}
      leftIcon={<IconArrowLeft />}
      className={cx(classes.smallBackButton, props.className)}
    >
      {props.children ?? 'Back'}
    </Button>
  )
}
