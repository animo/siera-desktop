import type { MantineNumberSize } from '@mantine/core'
import type { TitleSize } from '@mantine/core/lib/Title/Title'

import { Flex, Box, createStyles, Paper, Text, Title } from '@mantine/core'
import React from 'react'

interface CardProps {
  title?: string
  titleSize?: TitleSize
  description?: string
  descriptionSize?: MantineNumberSize
  children?: React.ReactNode
  withPadding?: boolean
  actions?: React.ReactNode
}

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    border: `1px solid ${theme.colors.backgroundOne[6]}`,
    borderRadius: theme.radius.md,
  },
}))

export const Card = ({
  children,
  title,
  description,
  withPadding,
  titleSize = 'h4',
  descriptionSize = 'sm',
  actions,
}: CardProps) => {
  const { classes } = useStyles()

  const xPadding = 'md'

  const contentPadding = withPadding ? xPadding : 0
  const bottomPadding = withPadding ? 'md' : 0

  return (
    <Paper className={classes.card} pt="xs" pb={bottomPadding}>
      {/* <Group position={!title ? 'right' : 'apart'} pb="xs" pr="sm"> */}
      <Flex justify="space-between" align="center" pb="xs" pr="xs">
        {title && (
          <Title size={titleSize} weight={600} px={xPadding}>
            {title}
          </Title>
        )}
        {actions}
      </Flex>
      {/* </Group> */}
      {description && (
        <Text color="dimmed" size={descriptionSize} mb="md" px={xPadding}>
          {description}
        </Text>
      )}
      <Box px={contentPadding}>{children}</Box>
    </Paper>
  )
}
