import type { ContextModalProps } from '@mantine/modals'

import { schemaIdRegex } from '@aries-framework/core/build/utils'
import { useAgent } from '@aries-framework/react-hooks'
import { Box, Divider, Flex, Group, Select, Space, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'

import { LoadingSpinner } from '../components/LoadingSpinner'
import { PrimaryButton, SecondaryButton } from '../components/generic'
import { useSchemas } from '../hooks/useSchemas'

interface CreateCredentialDefinitionValues {
  schemaId: string
  issuerId: string
  tag: string
}

export const CreateCredentialDefinitionModal = ({ context, id }: ContextModalProps) => {
  const { agent } = useAgent()
  const [customSchemaId, setCustomSchemaId] = useState<string | undefined>()
  const { schemas } = useSchemas()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<CreateCredentialDefinitionValues>({
    initialValues: {
      issuerId: agent?.publicDid?.did ?? '',
      schemaId: '',
      tag: '',
    },
    validate: {
      issuerId: (value) => (value?.length === 0 ? 'No issuer id provided.' : null),
      schemaId: (value) => (value?.length === 0 ? 'No schema id provided.' : null),
      tag: (value) => (value?.length === 0 ? 'No tag provided.' : null),
    },
  })

  const selectableSchemaIds = schemas.map((s) => s.id)
  if (customSchemaId) selectableSchemaIds.unshift(customSchemaId)

  const createCredentialDefinition = async (credentialDefinition: CreateCredentialDefinitionValues) => {
    try {
      if (!schemaIdRegex.test(credentialDefinition.schemaId)) {
        showNotification({
          title: 'Error',
          message: `Schema id '${credentialDefinition.schemaId}' is not a valid schema id.`,
          color: 'error',
        })
        return
      }

      setIsLoading(true)

      let schema = schemas.find((s) => s.id === credentialDefinition.schemaId)
      if (!schema) {
        schema = await agent?.ledger.getSchema(credentialDefinition.schemaId)
      }

      if (!schema) {
        showNotification({
          title: 'Error',
          message: `Schema with id '${credentialDefinition.schemaId}' not found. Are you sure the schema exists?`,
          color: 'error',
        })
        setIsLoading(false)
        return
      }

      await agent?.ledger.registerCredentialDefinition({
        tag: credentialDefinition.tag,
        supportRevocation: false,
        schema,
      })
      context.closeModal(id)
    } catch (error) {
      const errorMessage = (error as Error)?.message ?? 'Unknown error occurred.'
      showNotification({
        title: 'Error',
        message: `Could not create schema. ${errorMessage}`,
        color: 'error',
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Box px="xl">
        <Text color="dimmed">Create and register a credential definition on a registry.</Text>
        {isLoading ? (
          <Flex h={200} align="center" justify="center">
            <LoadingSpinner />
          </Flex>
        ) : (
          <>
            <Space h="md" />
            <form onSubmit={form.onSubmit(createCredentialDefinition)} id="createCredentialDefinition">
              <Select
                label="Issuer id"
                data={
                  agent?.publicDid?.did
                    ? [
                        {
                          value: agent.publicDid.did,
                          label: agent.publicDid.did,
                        },
                      ]
                    : [
                        {
                          value: '',
                          label: "You don't have any public dids.",
                          disabled: true,
                        },
                      ]
                }
                {...form.getInputProps('issuerId')}
              />
              <Space h="md" />

              <Select
                label="Schema id"
                data={selectableSchemaIds.map((id) => ({ value: id, label: id }))}
                description="Choose a schema from the agent, or provide a schema created outside the agent."
                placeholder="Provide a schema id."
                searchable
                creatable
                getCreateLabel={(query) => `Use ${query}`}
                onCreate={(query) => {
                  // TODO: async fetch schemaId, and check whether it's a valid schema
                  setCustomSchemaId(query)
                  return query
                }}
                {...form.getInputProps('schemaId')}
              />

              <Space h="md" />
              <TextInput
                label="Tag"
                placeholder="Provide a tag for the credential definition."
                {...form.getInputProps('tag')}
              />
            </form>
          </>
        )}
      </Box>
      <Divider mt="xl" />
      <Group mt="md" position="right" px="md">
        <SecondaryButton disabled={isLoading} onClick={() => context.closeModal(id)}>
          Cancel
        </SecondaryButton>
        <PrimaryButton disabled={isLoading} type="submit" form="createCredentialDefinition">
          Create credential definition
        </PrimaryButton>
      </Group>
    </>
  )
}

export const openCreateCredentialDefinitionModal = () => {
  openContextModal({
    modal: CreateCredentialDefinitionModal.name,
    title: 'Create Credential Definition',
    centered: true,
    withCloseButton: false,
    size: 'xl',
    innerProps: {},
  })
}
