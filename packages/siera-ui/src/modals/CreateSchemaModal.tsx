import type { ContextModalProps } from '@mantine/modals'

import { getLegacySchemaId, getQualifiedIndySchemaId } from '@aries-framework/core/build/utils'
import { schemaVersionRegex } from '@aries-framework/core/build/utils/regex'
import { useAgent } from '@aries-framework/react-hooks'
import { Box, Divider, Flex, Group, MultiSelect, Select, Space, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import React, { useState } from 'react'

import { LoadingSpinner } from '../components/LoadingSpinner'
import { PrimaryButton, SecondaryButton } from '../components/generic'
import { useAgentPublicDid } from '../hooks/useAgentPublicDid'

interface CreateSchemaValues {
  issuerId: string
  attributeNames: string[]
  schemaName: string
  schemaVersion: string
}

export const CreateSchemaModal = ({ context, id }: ContextModalProps) => {
  const { agent } = useAgent()
  const agentPublicDid = useAgentPublicDid()
  const [attributeNames, setAttributeNames] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<CreateSchemaValues>({
    initialValues: {
      issuerId: agentPublicDid ?? '',
      attributeNames: [],
      schemaName: '',
      schemaVersion: '',
    },
    validate: {
      issuerId: (value) => (value?.length === 0 ? 'No issuer id provided.' : null),
      schemaName: (value) => (value?.length === 0 ? 'No schema name provided.' : null),
      schemaVersion: (value) => {
        if (value?.length === 0) return 'No schema version provided.'

        if (!schemaVersionRegex.test(value)) {
          return 'Schema version must be a number version with 1-3 values separated by dots (x.x.x)'
        }

        return null
      },
      attributeNames: (value) => (value?.length === 0 ? 'No attribute names provided.' : null),
    },
  })

  const createSchema = async (schema: CreateSchemaValues) => {
    setIsLoading(true)
    try {
      // This shouldn't happen (you can't submit without a public did), but good to handle)
      if (!agent?.publicDid?.did) {
        showNotification({
          title: 'Error',
          message: `Agent has no public did.`,
          color: 'error',
        })
        setIsLoading(false)
        return
      }

      const schemaId = getLegacySchemaId(agent.publicDid.did, schema.schemaName, schema.schemaVersion)
      const qualifiedSchemaId = getQualifiedIndySchemaId(agent.config.indyLedgers[0].indyNamespace, schemaId)
      try {
        const schemaOnLedger = await agent.ledger.getSchema(schemaId)
        if (schemaOnLedger) {
          showNotification({
            title: 'Error',
            message: `Schema with id '${qualifiedSchemaId}' already exists on the ledger.`,
            color: 'error',
          })
          setIsLoading(false)
          return
        }
      } catch (error) {
        // This is fine, the schema does not exist
      }

      await agent.ledger.registerSchema({
        attributes: schema.attributeNames,
        name: schema.schemaName,
        version: schema.schemaVersion,
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
                  agentPublicDid
                    ? [
                        {
                          value: agentPublicDid,
                          label: agentPublicDid,
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
                description="Must be a number version with 1-3 number values separated by dots (x.x.x)"
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
