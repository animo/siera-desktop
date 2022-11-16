import type { Agent } from '@aries-framework/core'

import { Avatar, createStyles, Group, Text } from '@mantine/core'
import React from 'react'

const useStyles = createStyles((theme) => ({
  agentGroup: {
    width: '100%',
    paddingTop: theme.spacing.sm,
  },
  textContainer: {
    flex: 1,
  },
}))

interface LayoutAvatarProps {
  agent: Agent
}

export const LayoutAvatar = ({ agent }: LayoutAvatarProps) => {
  const { classes } = useStyles()

  const avatarLabel = agent.config.label
  const avatarLabelShort = avatarLabel.substr(0, 1).toUpperCase()

  return (
    <Group className={classes.agentGroup}>
      <Avatar radius="xl">{avatarLabelShort}</Avatar>

      <div className={classes.textContainer}>
        <Text size="sm" weight={500}>
          {avatarLabel}
        </Text>
      </div>
    </Group>
  )
}
