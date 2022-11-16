import { uuid } from '@animo/toolbox-core/src/utils'
import { createStyles, TextInput, Paper, Title, Button } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { BackButton } from '../components/BackButton'
import { useAgentManager } from '../contexts/AgentManagerContext'

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
}

export const SetupScreen = () => {
  const navigate = useNavigate()
  const { classes } = useStyles()
  const form = useForm<CreateAgentForm>({
    initialValues: {
      agentLabel: '',
    },
  })
  const { setAgents } = useAgentManager()

  const createAgentConfig = (formData: CreateAgentForm) => {
    setAgents((a) => [
      ...a,
      {
        id: uuid(),
        name: formData.agentLabel,
        agentConfig: {
          label: formData.agentLabel,
          walletConfig: {
            id: uuid(),
            key: uuid(),
          },
        },
      },
    ])

    navigate('/')
  }

  return (
    <>
      <div className={classes.backButton}>
        <BackButton />
      </div>
      <div className={classes.screen}>
        <Title align="center" size="h3" sx={() => ({ fontWeight: 900 })}>
          Create a new Agent
        </Title>
        <Paper withBorder shadow="md" p={30} mt={20} radius="md">
          <form onSubmit={form.onSubmit(createAgentConfig)}>
            <TextInput label="Agent label" placeholder="Agent label" required {...form.getInputProps('agentLabel')} />

            <Button type="submit" fullWidth mt="xl">
              Create
            </Button>
          </form>
        </Paper>
      </div>
    </>
  )
}
