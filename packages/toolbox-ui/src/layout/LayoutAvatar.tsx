import type { Agent } from '@aries-framework/core'

import { Box, createStyles, Group, Text } from '@mantine/core'
import { useNetwork } from '@mantine/hooks'
import { IconWifi } from '@tabler/icons'
import React from 'react'

import { SmartAvatar } from '../components/SmartAvatar'

interface LayoutAvatarProps {
  agent: Agent
}

const useStyles = createStyles((theme) => ({
  variantLabel: {
    color: theme.colors.textOne[3],
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
  },
  avatarLabel: {
    color: theme.colors.textOne[7],
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
  },
  attributeLabel: {
    color: theme.colors.textOne[7],
    fontSize: theme.fontSizes.xs,
  },
  connectedStatusConnected: {
    color: theme.colors.success[7],
  },
  connectedStatusDisconnected: {
    color: theme.colors.error[7],
  },
}))

export const LayoutAvatar = ({ agent }: LayoutAvatarProps) => {
  const { classes } = useStyles()
  const { online } = useNetwork()
  const avatarLabel = agent.config.label

  return (
    <Group noWrap>
      <SmartAvatar src={agent.config.connectionImageUrl} size={64} radius="md">
        {avatarLabel}
      </SmartAvatar>
      <Box>
        <Text className={classes.variantLabel}>Native (AFJ)</Text>
        <Text className={classes.avatarLabel}>{avatarLabel}</Text>

        <Group noWrap spacing={10} mt={3}>
          <Text className={classes.attributeLabel}>{online ? 'Connected' : 'Offline'}</Text>
          <IconWifi
            size={20}
            stroke={1.5}
            className={online ? classes.connectedStatusConnected : classes.connectedStatusDisconnected}
          />
        </Group>
      </Box>
    </Group>
  )
}
