import { Card, Container, Flex, Group, Space, Text, Title, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'

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
      <Space h="xs" />
      <Flex gap="md" wrap="wrap">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card shadow="xs" withBorder h={80} w={170}>
              <Text weight="bold">{agent.name}</Text>
            </Card>
          </UnstyledButton>
        ))}
        <UnstyledButton onClick={() => navigation.navigate('/setup')} h={80}>
          <Group spacing="sm">
            <IconPlus />
            <Text span>Create new Agent</Text>
          </Group>
        </UnstyledButton>
      </Flex>
    </Container>
  )
}
