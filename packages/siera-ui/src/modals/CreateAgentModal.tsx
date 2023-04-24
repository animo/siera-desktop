import type { ContextModalProps } from '@mantine/modals'

import { uuid } from '@animo/siera-core/src/utils'
import { Group, TextInput, Text, Divider, Stack } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import React from 'react'

import { PrimaryButton, SecondaryButton } from '../components/generic'
import { useAgentManager } from '../contexts/AgentManagerContext'
import { registerIndyDidOnBcovrinTest } from '../utils'

interface CreateAgentForm {
  agentLabel: string
  mediatorInviteUrl: string
}

export const CreateAgentModal = ({ context, id }: ContextModalProps) => {
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
    const { seed } = await registerIndyDidOnBcovrinTest()

    await addAgent({
      id: uuid(),
      name: formData.agentLabel,
      agentConfig: {
        label: formData.agentLabel,
        walletConfig: {
          id: uuid(),
          key: uuid(),
        },
        publicDidSeed: seed,
        mediatorConnectionsInvite: formData.mediatorInviteUrl === '' ? undefined : formData.mediatorInviteUrl,
      },
    })

    context.closeModal(id)
  }

  const agentLabel = agentManager.agents.length === 0 ? 'First agent' : 'Development'

  return (
    <form onSubmit={form.onSubmit(createAgentConfig)}>
      <Stack>
        <Stack px="xl">
          <Text color="dimmed">Enter the details for your new agent.</Text>
          <TextInput label="Label" placeholder={agentLabel} required {...form.getInputProps('agentLabel')} />
          <TextInput
            label="Mediator"
            placeholder="https://mediator.com/example-url"
            {...form.getInputProps('mediatorInviteUrl')}
          />
        </Stack>
        <Divider mt="xs" />
        <Group position="right" px="xl">
          <SecondaryButton onClick={() => context.closeModal(id)}>Cancel</SecondaryButton>
          <PrimaryButton type="submit">Create</PrimaryButton>
        </Group>
      </Stack>
    </form>
  )
}

export const openCreateAgentModal = () => {
  openContextModal({
    modal: CreateAgentModal.name,
    title: 'Create a new agent',
    innerProps: {},
    centered: true,
    withCloseButton: false,
  })
}
