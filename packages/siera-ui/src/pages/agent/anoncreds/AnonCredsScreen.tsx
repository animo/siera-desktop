import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Space } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { ConnectionsTable } from '../../../components/connections/ConnectionsTable'
import { PrimaryButton } from '../../../components/generic'
import { EmptyState } from '../../../components/generic/table/EmptyState'
import { openCreateCredentialDefinitionModal, openCreateSchemaModal } from '../../../modals'

interface ConnectionInviteValues {
  url: string
}

export const AnonCredsScreen = () => {
  const form = useForm<ConnectionInviteValues>({ initialValues: { url: '' } })
  const { agent } = useAgent()
  const { records: connectionRecords, loading: connectionLoading } = useConnections()

  const { records: schemaRecords, loading: schemasLoading } = { records: [], loading: false }
  const { records: credentialDefinitionRecords, loading: credentialDefinitionsLoading } = {
    records: [],
    loading: false,
  }

  const isLoading = schemasLoading || credentialDefinitionsLoading

  return (
    <>
      <Header title="AnonCreds" description="Create and manage AnonCreds schemas and credential definitions." />
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {schemaRecords.length === 0 ? (
            <EmptyState title="No schemas" message="You don't have any schemas yet." withCard>
              <PrimaryButton size="xs" onClick={openCreateSchemaModal}>
                Create schema
              </PrimaryButton>
            </EmptyState>
          ) : (
            <Card
              title="Created schemas"
              actions={
                <PrimaryButton size="xs" onClick={openCreateSchemaModal}>
                  Create schema
                </PrimaryButton>
              }
            >
              <ConnectionsTable
                records={[]}
                onDelete={(connection) => {
                  console.log('delete')
                }}
              />
            </Card>
          )}
          <Space h="xl" />
          {credentialDefinitionRecords.length === 0 ? (
            <EmptyState
              title="No credential definitions"
              message="You don't have any credential definitions yet."
              withCard
            >
              <PrimaryButton size="xs" onClick={openCreateCredentialDefinitionModal}>
                Create definition
              </PrimaryButton>
            </EmptyState>
          ) : (
            <Card
              title="Created credential definitions"
              actions={
                <PrimaryButton size="xs" onClick={openCreateCredentialDefinitionModal}>
                  Create definition
                </PrimaryButton>
              }
            >
              <ConnectionsTable
                records={connectionRecords}
                onDelete={(connection) => agent?.connections.deleteById(connection.id)}
              />
            </Card>
          )}
        </>
      )}
    </>
  )
}
