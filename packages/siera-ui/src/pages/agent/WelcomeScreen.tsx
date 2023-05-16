import { Center, Flex, Text, Title, useMantineColorScheme } from '@mantine/core'
import React from 'react'

import { PrimaryButton } from '../../components/generic'
import { useAgentManager } from '../../contexts/AgentManagerContext'
import { useNavigation } from '../../hooks/useNavigation'
import { SieraLogo } from '../../logos/SieraLogo'
import { openCreateAgentModal } from '../../modals/CreateAgentModal'

export const WelcomeScreen = () => {
  const navigation = useNavigation()
  const { setCurrentAgentId } = useAgentManager()
  const { colorScheme } = useMantineColorScheme()

  const switchToAgent = (agentId: string) => {
    setCurrentAgentId(agentId)
    navigation.navigate('/agent/connections')
  }

  return (
    <Center mt={60}>
      <Flex direction="column" gap="md" align="center">
        <SieraLogo height={150} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Title mt="xl">Hey there!</Title>
        <Text align="center">
          Welcome to Siera Desktop! Hit the button below to <br /> create your very first agent.
        </Text>
        <Center mt="md">
          <PrimaryButton
            onClick={() => openCreateAgentModal({ onCreate: (agentId) => switchToAgent(agentId) })}
            withPlusIcon
          >
            New agent
          </PrimaryButton>
        </Center>
      </Flex>
    </Center>
  )
}
