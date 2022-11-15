import type { Agent } from '@aries-framework/core'

import { createStyles, Flex, Text, UnstyledButton } from '@mantine/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAgentManager } from '../contexts/AgentManagerContext'

const useStyles = createStyles((theme) => ({
  agent: {
    width: '100%',
    paddingTop: theme.spacing.sm,
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  },
}))

interface LayoutAvatarProps {
  agent: Agent
}

export const LayoutAvatar = ({ agent }: LayoutAvatarProps) => {
  const { setCurrentAgentId } = useAgentManager()
  const navigate = useNavigate()
  const { classes } = useStyles()

  const signOut = () => {
    navigate('/')

    setCurrentAgentId(undefined)
  }

  return (
    <>
      <Flex className={classes.agent} direction={'column'}>
        <Text weight={600}>{agent.config.label}</Text>
        <UnstyledButton onClick={signOut}>
          <Text c={'dimmed'} size={'sm'}>
            Sign out
          </Text>
        </UnstyledButton>
      </Flex>
    </>
  )
}
