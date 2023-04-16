import type { ConnectionRecord } from '@aries-framework/core'
import type { AnonCredsCredentialDefinitionRecord } from '@aries-framework/core/build/modules/indy/repository/AnonCredsCredentialDefinitionRecord'
import type { ContextModalProps } from '@mantine/modals'

import { AnonCredsCredentialDefinitionRepository } from '@aries-framework/core/build/modules/indy/repository/AnonCredsCredentialDefinitionRepository'
import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Box, Center, Divider, Flex, Group, SegmentedControl, Select, Space, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import React, { useEffect, useMemo, useState } from 'react'

import { Card } from '../components/Card'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { PrimaryButton, SecondaryButton } from '../components/generic'

interface IssueCredentialValues {
  connectionId: string
  protocolVersion: 'v1' | 'v2'
  credentialFormat: 'anoncreds'
  anoncreds?: {
    credentialDefinitionId: string
    values: {
      [key: string]: string
    }
  }
}

const getConnectionLabel = (connectionRecord: ConnectionRecord) => {
  const idPart = connectionRecord.id.substring(0, 4)

  const prefix = connectionRecord.alias ?? connectionRecord.theirLabel ?? 'Connection'
  return `${prefix} - ${idPart}`
}

const useCredentialDefinitions = () => {
  const { agent } = useAgent()
  const [credentialDefinitions, setCredentialDefinitions] = useState<AnonCredsCredentialDefinitionRecord[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!agent) return

    setIsLoading(true)
    const anonCredsCredentialDefinitionRepository = agent.dependencyManager.resolve(
      AnonCredsCredentialDefinitionRepository
    )

    anonCredsCredentialDefinitionRepository
      .getAll(agent.context)
      .then((credentialDefinitions) => {
        setCredentialDefinitions(credentialDefinitions)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }, [agent])

  return { credentialDefinitions, isLoading }
}

export const IssueCredentialModal = ({ context, id }: ContextModalProps) => {
  const { records } = useConnections()
  const readyConnections = useMemo(() => records.filter((c) => c.isReady), [records])
  const [anonCredsCredentialKeys, setAnonCredsCredentialKeys] = useState<string[]>([])

  const form = useForm<IssueCredentialValues>({
    initialValues: {
      protocolVersion: 'v2',
      connectionId: readyConnections.length >= 1 ? readyConnections[0].id : '',
      credentialFormat: 'anoncreds',
      anoncreds: {
        credentialDefinitionId: '',
        values: {},
      },
    },
    validate: {
      connectionId: (value) => (value?.length === 0 ? 'No connection selected.' : null),
      anoncreds: {
        credentialDefinitionId: (value, values) => {
          if (values.credentialFormat !== 'anoncreds') return null

          return value.length > 0 ? null : 'No credential definition selected'
        },
        // This dynamically generates the validation methods for the keys
        // from the schema, and makes sure all those keys are present
        values: anonCredsCredentialKeys.reduce(
          (allKeys, key) => ({
            ...allKeys,
            [key]: (innerValue: string | undefined, values: IssueCredentialValues) => {
              if (values.credentialFormat !== 'anoncreds') return null

              return !innerValue || innerValue.length === 0 ? `Missing value for attribute ${key}` : null
            },
          }),
          {}
        ),
      },
    },
  })
  const { credentialDefinitions, isLoading: isLoadingCredentialDefinitions } = useCredentialDefinitions()
  const { agent } = useAgent()

  const credentialFormats =
    form.values.protocolVersion === 'v1'
      ? [
          { value: 'anoncreds', label: 'AnonCreds' },
          // JSON-LD not supported in v1 of protocol
          { value: 'jsonld', label: 'JSON-LD', disabled: true },
        ]
      : [
          { value: 'anoncreds', label: 'AnonCreds' },
          // JSON-LD not yet implemented for v2 (but is supported)
          { value: 'jsonld', label: 'JSON-LD', disabled: true },
        ]

  const selectedCredentialDefinition = credentialDefinitions[0]?.credentialDefinition

  useEffect(() => {
    if (!selectedCredentialDefinition || !agent) return

    agent.ledger.getSchema(selectedCredentialDefinition.schemaId).then((schema) => {
      setAnonCredsCredentialKeys(schema.attrNames)
    })
  }, [selectedCredentialDefinition, agent])

  const issueCredential = (props: IssueCredentialValues) => {
    console.log(props)
  }

  useEffect(() => {
    agent?.ledger
      .registerSchema({
        attributes: ['Name', 'Date of Birth', 'Role'],
        name: 'Employee Badge',
        version: '1.0',
      })
      .then((s) => {
        agent.ledger.registerCredentialDefinition({
          schema: s,
          supportRevocation: false,
          tag: 'Employee Badge',
        })
      })
  }, [])

  return (
    <>
      <Box px="xl">
        <Text color="dimmed">Issue a credential to another agent you&apos;re connected with.</Text>
        <Space h="md" />
        <form onSubmit={form.onSubmit(issueCredential)} id="issueCredential">
          <Select
            label="Connection"
            data={
              readyConnections.length === 0
                ? [
                    {
                      disabled: true,
                      label: "You don't have any connections.",
                      value: '',
                    },
                  ]
                : readyConnections.map((c) => ({ value: c.id, label: getConnectionLabel(c) }))
            }
            {...form.getInputProps('connectionId')}
          />
          <Space h="md" />
          <Select
            label="Protocol Version"
            data={[
              { value: 'v1', label: 'Issue Credential V1' },
              { value: 'v2', label: 'Issue Credential V2' },
            ]}
            {...form.getInputProps('protocolVersion')}
          ></Select>

          <Space h="md" />

          <Card title="Credential Format">
            <SegmentedControl
              mx="sm"
              my="sm"
              fullWidth
              data={credentialFormats}
              {...form.getInputProps('credentialFormat')}
            />
            <Divider my="sm" />
            <Box px="md" pb="md">
              {form.values.credentialFormat === 'anoncreds' && (
                <Select
                  label="Credential Definition"
                  placeholder="Select a credential definition"
                  data={
                    credentialDefinitions.length === 0
                      ? [
                          {
                            disabled: true,
                            label: isLoadingCredentialDefinitions
                              ? 'Loading credential definitions...'
                              : "You don't have any credential definitions.",
                            value: '',
                          },
                        ]
                      : credentialDefinitions.map((c) => ({
                          value: c.credentialDefinition.id,
                          label: `${c.credentialDefinition.tag} - ${c.credentialDefinition.id}`,
                        }))
                  }
                  {...form.getInputProps('anoncreds.credentialDefinitionId')}
                ></Select>
              )}

              {form.values.anoncreds?.credentialDefinitionId &&
                form.values.anoncreds.credentialDefinitionId.length > 0 &&
                (anonCredsCredentialKeys.length > 0 ? (
                  <>
                    <Space h="md" />
                    <Card title="Credential Attributes" titleSize="sm">
                      <Divider pb="xs" />
                      <Box px="md">
                        {anonCredsCredentialKeys.length > 0 && (
                          <>
                            {anonCredsCredentialKeys.map((key) => (
                              <>
                                <TextInput key={key} label={key} {...form.getInputProps(`anoncreds.values.${key}`)} />
                                <Space key={`${key}-spacer`} h="md" />
                              </>
                            ))}
                          </>
                        )}
                      </Box>
                    </Card>
                  </>
                ) : (
                  <>
                    <Space h="md" />
                    {/* <Box h={200}> */}
                    <Flex direction="column" h={200} align="center" gap="sm" justify="center">
                      <Center>
                        <LoadingSpinner />
                      </Center>
                    </Flex>
                    {/* </Box> */}
                  </>
                ))}
            </Box>
          </Card>
        </form>
      </Box>
      <Divider mt="xl" />
      <Group mt="md" position="right" px="md">
        <SecondaryButton onClick={() => context.closeModal(id)}>Cancel</SecondaryButton>
        <PrimaryButton type="submit" form="issueCredential">
          Issue Credential
        </PrimaryButton>
      </Group>
    </>
  )
}

export const openIssueCredentialModal = () => {
  openContextModal({
    modal: IssueCredentialModal.name,
    title: 'Issue Credential',
    centered: true,
    withCloseButton: false,
    size: 'xl',
    innerProps: {},
  })
}
