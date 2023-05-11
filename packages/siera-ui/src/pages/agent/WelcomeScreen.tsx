import { Center, Flex, Text, Title, useMantineColorScheme } from '@mantine/core'
import React from 'react'

import { PrimaryButton } from '../../components/generic'
import { SieraLogo } from '../../logos/SieraLogo'
import { openCreateAgentModal } from '../../modals/CreateAgentModal'

export const WelcomeScreen = () => {
  const { colorScheme } = useMantineColorScheme()
  return (
    <Center mt={60}>
      <Flex direction="column" gap="md" align="center">
        <SieraLogo height={150} color={colorScheme === 'dark' ? 'white' : 'black'} />
        <Title mt="xl">Hey there!</Title>
        <Text align="center">
          Welcome to Siera Desktop! Hit the button below to <br /> create your very first agent.
        </Text>
        <Center mt="md">
          <PrimaryButton onClick={openCreateAgentModal} withPlusIcon>
            New agent
          </PrimaryButton>
        </Center>
      </Flex>
    </Center>
  )
}
