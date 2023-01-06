import type { BadgeProps } from '@mantine/core'

import { Badge, createStyles } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({
  badge: {
    backgroundColor: theme.colors.info[7],
    color: theme.colors.textTwo[7],
  },
}))

export const StatusBadge = (props: BadgeProps) => {
  const { classes, cx } = useStyles()

  return <Badge {...props} className={cx(classes.badge, props.className)} />
}
