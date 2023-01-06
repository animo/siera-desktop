import { Box, Card, Container, createStyles, Flex, Group, Text, Title, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'
import { SmartAvatar } from '../components/SmartAvatar'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.secondaryOne[5],
    boxShadow: theme.shadows.xs,
    transition: 'background-color 0.2s ease',

    '&:hover': {
      backgroundColor: theme.colors.secondaryOne[4],
    },
  },
  variantLabel: {
    color: theme.colors.textOne[7],
    textTransform: 'uppercase',
    fontWeight: 700,
    fontSize: theme.fontSizes.xs,
  },
  avatarLabel: {
    color: theme.colors.textOne[7],
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
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
      <Title size="h2" mb="md">
        Agents
      </Title>
      <Flex gap="md" wrap="wrap">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={100} w={220} className={classes.card}>
              <Group noWrap>
                <SmartAvatar src={agent.agentConfig.connectionImageUrl} size={64} radius="md">
                  {agent.agentConfig.label}
                </SmartAvatar>
                <Box>
                  <Text className={classes.variantLabel}>Native (AFJ)</Text>
                  <Text className={classes.avatarLabel}>{agent.agentConfig.label}</Text>
                </Box>
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
