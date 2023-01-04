import { Card, Container, createStyles, Flex, Group, Space, Text, Title, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'
import { SmartAvatar } from '../components/SmartAvatar'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    boxShadow: theme.shadows.xs,
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
    },
  },
}))

export const AgentSelectionScreen = () => {
  const { classes } = useStyles()
  const navigation = useNavigation()
  const { agents, setCurrentAgentId, loading } = useAgentManager()

  const switchToAgent = (agentId: string) => {
    setCurrentAgentId(agentId)
    navigation.navigate('/agent')
  }

  if (loading) {
    return <Loading description="Loading configuration" />
  }

  return (
    <Container mt={20}>
      <Title size="h2">Agents</Title>
      <Space h="md" />
      <Flex gap="md" wrap="wrap">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={100} w={220} className={classes.card}>
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
