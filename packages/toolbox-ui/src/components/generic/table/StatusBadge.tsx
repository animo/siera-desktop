import type { BadgeProps } from '@mantine/core'

import { Badge, useMantineTheme } from '@mantine/core'
import React from 'react'

export const StatusBadge = (props: BadgeProps) => {
  const { colorScheme } = useMantineTheme()

  return <Badge variant={colorScheme === 'dark' ? 'light' : 'outline'} color="blue" {...props} />
}
