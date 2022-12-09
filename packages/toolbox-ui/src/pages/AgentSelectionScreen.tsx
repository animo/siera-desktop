import { Card, Container, Flex, Group, Space, Text, Title, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'

import { SmartAvatar } from '../components/SmartAvatar'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'

export const AgentSelectionScreen = () => {
  const navigation = useNavigation()
  const { agents, setCurrentAgentId } = useAgentManager()

  const switchToAgent = (agentId: string) => {
    setCurrentAgentId(agentId)
    navigation.navigate('/agent')
  }

  return (
    <Container mt={20}>
      <Title size="h3">Agents</Title>
      <Space h="md" />
      <Flex gap="md" wrap="wrap">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={100} w={220}>
              <Group noWrap>
                <SmartAvatar src={agent.agentConfig.connectionImageUrl} size={64} radius="md">
                  {agent.agentConfig.label}
                </SmartAvatar>
                <div>
                  <Text size="xs" sx={{ textTransform: 'uppercase' }} weight={700} color="dimmed">
                    Native (AFJ)
                  </Text>
                  <Text size="md" weight={600}>
                    {agent.agentConfig.label}
                  </Text>
                </div>
              </Group>
            </Card>
          </UnstyledButton>
        ))}
        <UnstyledButton onClick={() => navigation.navigate('/setup')} h={100}>
          <Group spacing="sm">
            <IconPlus />
            <Text span>Create new Agent</Text>
          </Group>
        </UnstyledButton>
      </Flex>
    </Container>
  )
}
