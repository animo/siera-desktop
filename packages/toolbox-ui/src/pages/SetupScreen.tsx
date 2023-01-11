import { uuid } from '@animo/toolbox-core/src/utils'
import { createStyles, TextInput, Paper, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

import { BackButton } from '../components/BackButton'
import { PrimaryButton } from '../components/generic'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { useNavigation } from '../hooks/useNavigation'

const useStyles = createStyles(() => ({
  backButton: {
    position: 'absolute',
    top: '13px',
    left: '13px',
  },
  screen: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
}))

interface CreateAgentForm {
  agentLabel: string
  mediatorInviteUrl: string
}

const robotImages = [
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772614920032306/robot1.webp',
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772615591100426/robot3.jpeg',
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772615838572565/robot4.jpeg',
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772616136359936/robot5.jpg',
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772616601927700/robot7.webp',
  'https://cdn.discordapp.com/attachments/1050772574222688346/1050772616882966569/robot8.webp',
]

const getRandomRobotImage = () => {
  return robotImages[Math.floor(Math.random() * robotImages.length)]
}

export const SetupScreen = () => {
  const navigation = useNavigation()
  const { classes } = useStyles()
  const agentManager = useAgentManager()
  const form = useForm<CreateAgentForm>({
    initialValues: {
      agentLabel: '',
      mediatorInviteUrl:
        'https://mediator.dev.animo.id/invite?oob=eyJAdHlwZSI6Imh0dHBzOi8vZGlkY29tbS5vcmcvb3V0LW9mLWJhbmQvMS4xL2ludml0YXRpb24iLCJAaWQiOiIyMDc1MDM4YS05ZGU3LTRiODItYWUxYi1jNzBmNDg4MjYzYTciLCJsYWJlbCI6IkFuaW1vIE1lZGlhdG9yIiwiYWNjZXB0IjpbImRpZGNvbW0vYWlwMSIsImRpZGNvbW0vYWlwMjtlbnY9cmZjMTkiXSwiaGFuZHNoYWtlX3Byb3RvY29scyI6WyJodHRwczovL2RpZGNvbW0ub3JnL2RpZGV4Y2hhbmdlLzEuMCIsImh0dHBzOi8vZGlkY29tbS5vcmcvY29ubmVjdGlvbnMvMS4wIl0sInNlcnZpY2VzIjpbeyJpZCI6IiNpbmxpbmUtMCIsInNlcnZpY2VFbmRwb2ludCI6Imh0dHBzOi8vbWVkaWF0b3IuZGV2LmFuaW1vLmlkIiwidHlwZSI6ImRpZC1jb21tdW5pY2F0aW9uIiwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtvSG9RTUphdU5VUE5OV1pQcEw3RGs1SzNtQ0NDMlBpNDJGY3FwR25iampMcSJdLCJyb3V0aW5nS2V5cyI6W119LHsiaWQiOiIjaW5saW5lLTEiLCJzZXJ2aWNlRW5kcG9pbnQiOiJ3c3M6Ly9tZWRpYXRvci5kZXYuYW5pbW8uaWQiLCJ0eXBlIjoiZGlkLWNvbW11bmljYXRpb24iLCJyZWNpcGllbnRLZXlzIjpbImRpZDprZXk6ejZNa29Ib1FNSmF1TlVQTk5XWlBwTDdEazVLM21DQ0MyUGk0MkZjcXBHbmJqakxxIl0sInJvdXRpbmdLZXlzIjpbXX1dfQ',
    },
  })
  const { addAgent } = useAgentManager()

  const createAgentConfig = async (formData: CreateAgentForm) => {
    await addAgent({
      id: uuid(),
      name: formData.agentLabel,
      agentConfig: {
        label: formData.agentLabel,
        connectionImageUrl: getRandomRobotImage(),
        walletConfig: {
          id: uuid(),
          key: uuid(),
        },
        mediatorConnectionsInvite: formData.mediatorInviteUrl === '' ? undefined : formData.mediatorInviteUrl,
      },
    })

    navigation.navigate('/')
  }

  const agentLabel = agentManager.agents.length === 0 ? 'First agent' : 'My agent'

  return (
    <>
      <div className={classes.backButton}>
        <BackButton />
      </div>
      <div className={classes.screen}>
        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <Title align="center" size="h3" weight={900} mb="xs">
            Create a new Agent
          </Title>
          <form onSubmit={form.onSubmit(createAgentConfig)}>
            <TextInput label="Agent label" placeholder={agentLabel} required {...form.getInputProps('agentLabel')} />
            <TextInput
              label="Mediator invite url"
              placeholder="https://mediator.com/example-url"
              {...form.getInputProps('mediatorInviteUrl')}
            />

            <PrimaryButton type="submit" fullWidth mt="xl">
              Create
            </PrimaryButton>
          </form>
        </Paper>
      </div>
    </>
  )
}
