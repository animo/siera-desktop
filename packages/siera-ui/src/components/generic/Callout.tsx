import type { MantineNumberSize } from '@mantine/core'
import type { TitleSize } from '@mantine/core/lib/Title/Title'

import { Box, clsx, createStyles, Paper, Text, Title } from '@mantine/core'
import React from 'react'

interface CalloutProps {
  title?: string
  titleSize?: TitleSize
  description?: string
  descriptionSize?: MantineNumberSize
  children?: React.ReactNode
  withPadding?: boolean
  variant?: 'info' | 'warning' | 'error'
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    border: `1px solid ${theme.colors.backgroundOne[6]}`,
    borderRadius: theme.radius.md,
  },
  info: {
    backgroundColor: theme.colors.info[0],
    border: `1px solid ${theme.colors.info[6]}`,
  },
  warning: {
    backgroundColor: theme.colors.warning[0],
    border: `1px solid ${theme.colors.warning[6]}`,
  },
  error: {
    backgroundColor: theme.colors.error[1],
    border: `1px solid ${theme.colors.error[5]}`,
  },
}))

export const Callout = ({
  children,
  title,
  description,
  withPadding,
  titleSize = 'h5',
  descriptionSize = 'sm',
  variant = 'info',
}: CalloutProps) => {
  const { classes } = useStyles()

  const variantClass = {
    info: classes.info,
    warning: classes.warning,
    error: classes.error,
  }[variant]

  const xPadding = 'xs'

  const contentPadding = withPadding ? xPadding : 0
  const bottomPadding = withPadding ? 'md' : 0

  return (
    <Paper className={clsx(classes.card, variantClass)} pt="xs" pb={bottomPadding}>
      {title && (
        <Title size={titleSize} weight={600} mb="xs" px={xPadding}>
          {title}
        </Title>
      )}
      {description && (
        <Text color="dimmed" size={descriptionSize} mb="md" px={xPadding}>
          {description}
        </Text>
      )}
      <Box px={contentPadding}>{children}</Box>
    </Paper>
  )
}
