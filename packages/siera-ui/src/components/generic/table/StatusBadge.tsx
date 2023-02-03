import type { BadgeProps } from '@mantine/core'

import { Badge } from '@mantine/core'
import React from 'react'

export const StatusBadge = (props: BadgeProps) => {
  return <Badge color="primaryTwo" variant="dot" {...props} />
}
