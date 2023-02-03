import { Box, Card, Container, createStyles, Flex, Group, Text, Title, UnstyledButton } from '@mantine/core'
import { IconPlus } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'
import { SmartAvatar } from '../components/SmartAvatar'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'
import { ColorSchemeSwitch } from '../layout/actions/ColorSchemeSwitch'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.secondaryOne[6],
    boxShadow: theme.shadows.xs,

    '&:hover': {
      backgroundColor: theme.colors.secondaryOne[5],
    },
  },
  variantLabel: {
    color: theme.colors.textOne[7],
    textTransform: 'uppercase',
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
    navigation.navigate('/agent')
  }

  if (loading) {
    return <Loading description="Loading configuration" />
  }

  return (
    <Container mt={20}>
      <Flex justify="space-between">
        <Title size="h2" mb="md">
          Agents
        </Title>
        <ColorSchemeSwitch />
      </Flex>
      <Flex gap="md" wrap="wrap">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={80} w={220} className={classes.card} radius="md">
              <Flex align="center" h="100%">
                <Group noWrap>
                  <SmartAvatar src={agent.agentConfig.connectionImageUrl} size={48} radius="md">
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
        <UnstyledButton className={classes.createAgentButton} onClick={() => navigation.navigate('/setup')}>
          <Group spacing="sm">
            <IconPlus />
            <Text span>Create new Agent</Text>
          </Group>
        </UnstyledButton>
      </Flex>
    </Container>
  )
}
