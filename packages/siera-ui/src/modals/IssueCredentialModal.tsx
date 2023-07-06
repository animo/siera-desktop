import type { ConnectionRecord } from '@aries-framework/core'
import type { ContextModalProps } from '@mantine/modals'

import { CredentialRepository, AutoAcceptCredential } from '@aries-framework/core'
import { getLegacyCredentialDefinitionId } from '@aries-framework/core/build/utils'
import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Box, Center, Divider, Flex, Group, SegmentedControl, Select, Space, Text, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import React, { useEffect, useMemo, useState } from 'react'

import { Card } from '../components/Card'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { PrimaryButton, SecondaryButton } from '../components/generic'
import { useAnonCredsCredentialDefinitions } from '../contexts/AnonCredsCredentialDefinitionProvider'
import { useAnonCredsSchemas } from '../contexts/AnonCredsSchemaProvider'

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

export const IssueCredentialModal = ({ context, id }: ContextModalProps) => {
  const { records } = useConnections()
  const readyConnections = useMemo(() => records.filter((c) => c.isReady), [records])
  const { schemas } = useAnonCredsSchemas()
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
  const { credentialDefinitions, loading: isLoadingCredentialDefinitions } = useAnonCredsCredentialDefinitions()
  const { agent } = useAgent()

  const credentialFormats =
    form.values.protocolVersion === 'v1'
      ? [{ value: 'anoncreds', label: 'AnonCreds' }]
      : [{ value: 'anoncreds', label: 'AnonCreds' }]

  useEffect(() => {
    const credentialDefinitionId = form.values.anoncreds?.credentialDefinitionId

    if (!credentialDefinitionId || credentialDefinitionId === '') {
      setAnonCredsCredentialKeys([])
      return
    }

    const selectedCredentialDefinition = credentialDefinitions.find((c) => c.id === credentialDefinitionId)
    if (!selectedCredentialDefinition) {
      // TODO: handle error
      setAnonCredsCredentialKeys([])
      showNotification({
        title: 'Error',
        message: `Credential definition with id '${credentialDefinitionId}' not found in your agent.`,
        color: 'error',
      })
      return
    }

    // NOTE: Currently, we can only use local schemas, as we can't easily fetch the schema
    // based on the seqNo. This will automatically be fixed when 0.4.0 is used
    const selectedSchema = schemas.find((s) => String(s.seqNo) === selectedCredentialDefinition.schemaId)
    if (!selectedSchema) {
      // TODO: handle error
      setAnonCredsCredentialKeys([])
      showNotification({
        title: 'Error',
        message: `Schema with seqNo '${selectedCredentialDefinition.schemaId}' not found in agent. Only schemas created in this agent are supported currently.`,
        color: 'error',
      })
      return
    }

    setAnonCredsCredentialKeys(selectedSchema.attrNames)
  }, [form.values.anoncreds?.credentialDefinitionId])

  const issueCredential = async (props: IssueCredentialValues) => {
    if (!agent) return

    if (!props.anoncreds) {
      showNotification({
        title: 'Error',
        message: `Only issuance for AnonCreds is supported currently.`,
        color: 'error',
      })
      return
    }

    const [did, , , , schemaSeqNo, tag] = props.anoncreds.credentialDefinitionId.split('/')
    const namespaceIdentifier = did.split(':').pop() as string
    const credentialDefinitionId = getLegacyCredentialDefinitionId(namespaceIdentifier, Number(schemaSeqNo), tag)

    const credentialExchangeRecord = await agent.credentials.offerCredential({
      connectionId: props.connectionId,
      protocolVersion: props.protocolVersion,
      autoAcceptCredential: AutoAcceptCredential.ContentApproved,
      credentialFormats: {
        indy: {
          credentialDefinitionId,
          attributes: Object.entries(props.anoncreds.values).map(([name, value]) => ({ name, value })),
        },
      },
    })

    // FIXME: there's currently no role in AFJ, and thus we don't know which role a record has when it's in state 'issued'.
    // We will soon add it to AFJ, but this way we can at least show it properly in Siera Desktop
    credentialExchangeRecord.metadata.set('role', {
      role: 'issuer',
    })
    const credentialRepository = agent.dependencyManager.resolve(CredentialRepository)
    await credentialRepository.update(agent.context, credentialExchangeRecord)

    context.closeModal(id)
  }

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
                          value: c.id,
                          label: `${c.tag} - ${c.id}`,
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
                        {anonCredsCredentialKeys.map((key) => (
                          <>
                            <TextInput key={key} label={key} {...form.getInputProps(`anoncreds.values.${key}`)} />
                            <Space key={`${key}-spacer`} h="md" />
                          </>
                        ))}
                      </Box>
                    </Card>
                  </>
                ) : (
                  <>
                    <Space h="md" />
                    <Flex direction="column" h={200} align="center" gap="sm" justify="center">
                      <Center>
                        <LoadingSpinner />
                      </Center>
                    </Flex>
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
