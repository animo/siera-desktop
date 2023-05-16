import type { AgentConfigRecord } from '@animo/siera-core'

import { ActionIcon, Box, Card, Container, createStyles, Flex, Menu, Text, Title, UnstyledButton } from '@mantine/core'
import { IconDotsVertical } from '@tabler/icons'
import React from 'react'

import { Loading } from '../components/Loading'
import { SmartAvatar } from '../components/SmartAvatar'
import { PrimaryButton } from '../components/generic'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'
import { openConfirmActionModal } from '../modals/ConfirmActionModal'
import { openCreateAgentModal } from '../modals/CreateAgentModal'

import { WelcomeScreen } from './agent/WelcomeScreen'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.backgroundOne[7] : '#ffffff',
    border: `2px solid ${theme.colors.backgroundOne[6]}`,
    overflow: 'unset',

    '&:hover': {
      border: `2px solid ${theme.colors.backgroundOne[5]}`,
    },
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
  const { agents, setCurrentAgentId, removeAgent, loading } = useAgentManager()

  const switchToAgent = (agentId: string) => {
    setCurrentAgentId(agentId)
    navigation.navigate('/agent/connections')
  }

  const stopPropagation = (event: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => event.stopPropagation()

  const onDeleteAgent = (agentConfigRecord: AgentConfigRecord) => {
    openConfirmActionModal({
      title: 'Delete agent',
      description: `Are you sure you want to delete '${agentConfigRecord.name}' ?`,
      confirmLabel: 'Delete',
      onConfirm: async () => await removeAgent(agentConfigRecord.id),
    })
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
        <PrimaryButton
          onClick={() => openCreateAgentModal({ onCreate: (agentId) => switchToAgent(agentId) })}
          withPlusIcon
        >
          New agent
        </PrimaryButton>
      </Flex>
      <Text color="dimmed" size="md">
        Select an agent or click the create new agent button.
      </Text>
      <Flex gap="md" wrap="wrap" mt="xl">
        {agents.map((agent) => (
          <UnstyledButton key={agent.id} onClick={() => switchToAgent(agent.id)}>
            <Card h={80} w={220} className={classes.card} radius="md" p={0}>
              <Flex gap="sm" maw="100%" align="center" wrap="nowrap" pl="sm" mih="100%">
                <SmartAvatar src={agent.agentConfig.connectionImageUrl} size={38} radius="xl">
                  {agent.agentConfig.label}
                </SmartAvatar>
                <Box miw={0}>
                  <Text className={classes.avatarLabel} truncate>
                    {agent.agentConfig.label}
                  </Text>
                  <Text size="xs" color="dimmed" weight={500}>
                    Native (AFJ)
                  </Text>
                </Box>
                <Flex style={{ flex: 'auto', alignSelf: 'start' }} justify="end">
                  <Menu shadow="md" position="bottom-end" withArrow>
                    <Menu.Target>
                      <ActionIcon mt={2} onClick={stopPropagation} variant="transparent">
                        <IconDotsVertical size={16} />
                      </ActionIcon>
                    </Menu.Target>

                    <Menu.Dropdown onClick={stopPropagation}>
                      <Menu.Item onClick={() => onDeleteAgent(agent)}>Delete</Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Flex>
              </Flex>
            </Card>
          </UnstyledButton>
        ))}
      </Flex>
    </Container>
  )
}
