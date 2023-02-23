import { Box, Card, Container, createStyles, Flex, Group, Text, Title, UnstyledButton } from '@mantine/core'
import React from 'react'

import { Loading } from '../components/Loading'
import { SmartAvatar } from '../components/SmartAvatar'
import { PrimaryButton } from '../components/generic'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'
import { openCreateAgentModal } from '../modals'

import { WelcomeScreen } from './agent/WelcomeScreen'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    border: `2px solid ${theme.colors.backgroundOne[6]}`,
  },
  variantLabel: {
    color: theme.colors.textOne[7],
    fontWeight: 500,
    fontSize: theme.fontSizes.xs,
  },
  avatarLabel: {
    color: theme.colors.textOne[7],
    fontWeight: 600,
    fontSize: theme.fontSizes.md,
  },
  createAgentButton: {
    color: theme.colors.textOne[7],
    height: 80,
  },
}))

export const AgentSelectionScreen = () => {
  const { classes } = useStyles()
  const navigation = useNavigation()
  const { agents, setCurrentAgentId, loading } = useAgentManager()

  const switchToAgent = (agentId: string) => {
    setCurrentAgentId(agentId)
    navigation.navigate('/agent/connections')
  }

  if (loading) {
    return <Loading description="Loading configuration" />
  }

  if (agents.length === 0) {
    return <WelcomeScreen />
  }

  return (
    <Container mt={70}>
      <Flex justify="space-between">
        <Title size="h1" mb="md">
          Overview
        </Title>
        <PrimaryButton onClick={openCreateAgentModal} withPlusIcon>
          New agent
        </PrimaryButton>
      </Flex>
      <Text size="md">Select an agent or click the create new agent button.</Text>
      <Flex gap="md" wrap="wrap" mt="xl">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={80} w={220} className={classes.card} radius="md">
              <Flex align="center" h="100%">
                <Group noWrap>
                  <SmartAvatar src={agent.agentConfig.connectionImageUrl} size={38} radius="xl">
                    {agent.agentConfig.label}
                  </SmartAvatar>
                  <Box>
                    <Text className={classes.avatarLabel}>{agent.agentConfig.label}</Text>
                    <Text className={classes.variantLabel}>Native (AFJ)</Text>
                  </Box>
                </Group>
              </Flex>
            </Card>
          </UnstyledButton>
        ))}
      </Flex>
    </Container>
  )
}
