import type { Agent } from '@aries-framework/core'

import { Group, Text } from '@mantine/core'
import { useNetwork } from '@mantine/hooks'
import { IconWifi } from '@tabler/icons'
import React from 'react'

import { SmartAvatar } from '../components/SmartAvatar'

interface LayoutAvatarProps {
  agent: Agent
}

export const LayoutAvatar = ({ agent }: LayoutAvatarProps) => {
  const { online } = useNetwork()
  const avatarLabel = agent.config.label

  return (
    <Group noWrap>
      <SmartAvatar src={agent.config.connectionImageUrl} size={64} radius="md">
        {avatarLabel}
      </SmartAvatar>
      <div>
        <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
          Native (AFJ)
        </Text>
        <Text size="md" weight={600}>
          {avatarLabel}
        </Text>

        <Group noWrap spacing={10} mt={3}>
          <Text size="xs" color="dimmed">
            {online ? 'Connected' : 'Offline'}
          </Text>
          <IconWifi size={20} stroke={1.5} color={online ? 'green' : 'red'} />
        </Group>
      </div>
    </Group>
  )
}
