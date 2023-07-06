import type { Agent } from '@aries-framework/core'

import { Box, createStyles, Flex, Text } from '@mantine/core'
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
    <Flex gap="sm" maw="100%" wrap="nowrap">
      <SmartAvatar src={agent.config.connectionImageUrl} size="md" radius="xl">
        {avatarLabel}
      </SmartAvatar>
      <Box miw={0}>
        <Text className={classes.avatarLabel} lineClamp={2}>
          {avatarLabel}
        </Text>
        <Text color="dimmed" size="xs" weight={500}>
          Native (AFJ)
        </Text>
      </Box>
    </Flex>
  )
}
