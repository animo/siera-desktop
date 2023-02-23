import { Box, createStyles, Paper, Text, Title } from '@mantine/core'
import React from 'react'

interface CardProps {
  title?: string
  description?: string
  children?: React.ReactNode
  withPadding?: boolean
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    border: `2px solid ${theme.colors.backgroundOne[6]}`,
    borderRadius: theme.radius.md,
  },
}))

export const Card = ({ children, title, description, withPadding }: CardProps) => {
  const { classes } = useStyles()

  const xPadding = 'md'

  const contentPadding = withPadding ? xPadding : 0
  const bottomPadding = withPadding ? 'md' : 0

  return (
    <Paper className={classes.card} pt="xs" pb={bottomPadding}>
      {title && (
        <Title size="h4" weight={600} mb="xs" px={xPadding}>
          {title}
        </Title>
      )}
      {description && (
        <Text color="dimmed" size="sm" mb="md" px={xPadding}>
          {description}
        </Text>
      )}
      <Box px={contentPadding}>{children}</Box>
    </Paper>
  )
}