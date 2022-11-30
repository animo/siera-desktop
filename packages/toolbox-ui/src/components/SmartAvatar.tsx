import type { AvatarProps } from '@mantine/core'

import { Avatar } from '@mantine/core'
import React from 'react'

type SmartAvatarProps = AvatarProps

export const SmartAvatar = ({ children, ...props }: SmartAvatarProps) => {
  const label = children
    ? children
        .toString()
        .split(' ')
        .slice(0, 2)
        .map((word) => word.substring(0, 1))
        .join('')
    : undefined

  return <Avatar {...props} children={label}></Avatar>
}
