import type { Agent } from '@aries-framework/core'

import { Box, createStyles, Group, Text } from '@mantine/core'
import React from 'react'

import { SmartAvatar } from '../components/SmartAvatar'

interface LayoutAvatarProps {
  agent: Agent
}

const useStyles = createStyles((theme) => ({
  avatarLabel: {
    color: theme.colors.textOne[7],
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
  },
}))

export const LayoutAvatar = ({ agent }: LayoutAvatarProps) => {
  const { classes } = useStyles()
  const avatarLabel = agent.config.label

  return (
    <Group noWrap>
      <SmartAvatar src={agent.config.connectionImageUrl} size="md" radius="xl">
        {avatarLabel}
      </SmartAvatar>
      <Box>
        <Text className={classes.avatarLabel}>{avatarLabel}</Text>
        <Text color="dimmed" size="xs" weight={500}>
          Native (AFJ)
        </Text>
      </Box>
    </Group>
  )
}
