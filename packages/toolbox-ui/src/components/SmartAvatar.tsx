import type { AvatarProps } from '@mantine/core'

import { Avatar, createStyles } from '@mantine/core'
import React from 'react'

type SmartAvatarProps = AvatarProps

const useStyles = createStyles((theme) => ({
  placeholder: {
    backgroundColor: theme.fn.rgba(theme.colors.primaryOne[7], 0.1),
    color: theme.colors.primaryOne[7],
  },
}))

export const SmartAvatar = ({ children, ...props }: SmartAvatarProps) => {
  const { classes, cx } = useStyles()
  const label = children
    ? children
        .toString()
        .split(' ')
        .slice(0, 2)
        .map((word) => word.substring(0, 1))
        .join('')
        .toUpperCase()
    : undefined

  return (
    <Avatar
      {...props}
      classNames={{
        ...props.classNames,
        placeholder: cx(classes.placeholder, props.classNames?.placeholder),
      }}
    >
      {label}
    </Avatar>
  )
}
