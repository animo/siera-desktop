import type { ContextModalProps } from '@mantine/modals'

import { useAgent } from '@aries-framework/react-hooks'
import { Box, Divider, Flex, Group, MultiSelect, Select, Space, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'

import { LoadingSpinner } from '../components/LoadingSpinner'
import { PrimaryButton, SecondaryButton } from '../components/generic'

interface CreateSchemaValues {
  issuerId: string
  attributeNames: string[]
  schemaName: string
  schemaVersion: string
}

export const CreateSchemaModal = ({ context, id }: ContextModalProps) => {
  const { agent } = useAgent()
  const [attributeNames, setAttributeNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<CreateSchemaValues>({
    initialValues: {
      issuerId: agent?.publicDid?.did ?? '',
      attributeNames: [],
      schemaName: '',
      schemaVersion: '',
    },
    validate: {
      issuerId: (value) => (value?.length === 0 ? 'No issuer id provided.' : null),
      schemaName: (value) => (value?.length === 0 ? 'No schema name provided.' : null),
      schemaVersion: (value) => (value?.length === 0 ? 'No schema version provided.' : null),
      attributeNames: (value) => (value?.length === 0 ? 'No attribute names provided.' : null),
    },
  })

  const createSchema = async (schema: CreateSchemaValues) => {
    setIsLoading(true)
    try {
      await agent?.ledger.registerSchema({
        attributes: schema.attributeNames,
        name: schema.schemaName,
        version: schema.schemaVersion,
      })
      await new Promise((resolve) => setTimeout(resolve, 1000))
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
        <Text color="dimmed">Create and register a schema on a registry.</Text>
        {isLoading ? (
          <Flex h={200} align="center" justify="center">
            <LoadingSpinner />
          </Flex>
        ) : (
          <>
            <Space h="md" />
            <form onSubmit={form.onSubmit(createSchema)} id="createSchema">
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

              <TextInput
                label="Schema name"
                placeholder="Provide a name for the schema."
                {...form.getInputProps('schemaName')}
              />
              <Space h="md" />

              <TextInput
                label="Schema version"
                placeholder="Provide a version for the schema."
                {...form.getInputProps('schemaVersion')}
              />
              <Space h="md" />

              <MultiSelect
                label="Schema attributes"
                data={attributeNames.map((attributeName) => ({ value: attributeName, label: attributeName }))}
                placeholder="Provide attributes for the schema."
                searchable
                creatable
                getCreateLabel={(query) => `+ Add ${query}`}
                onCreate={(query) => {
                  setAttributeNames((current) => [...current, query])
                  return query
                }}
                {...form.getInputProps('attributeNames')}
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
        <PrimaryButton disabled={isLoading} type="submit" form="createSchema">
          Create schema
        </PrimaryButton>
      </Group>
    </>
  )
}

export const openCreateSchemaModal = () => {
  openContextModal({
    modal: CreateSchemaModal.name,
    title: 'Create Schema',
    centered: true,
    withCloseButton: false,
    size: 'xl',
    innerProps: {},
  })
}
