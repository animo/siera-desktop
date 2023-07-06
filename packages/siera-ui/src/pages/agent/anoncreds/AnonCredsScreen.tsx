import { Space } from '@mantine/core'
import React from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { AnonCredsCredentialDefinitionTable } from '../../../components/credential-definitions/AnonCredsCredentialDefinitionTable'
import { PrimaryButton } from '../../../components/generic'
import { EmptyState } from '../../../components/generic/table/EmptyState'
import { AnonCredsSchemaTable } from '../../../components/schemas/AnonCredsSchemaTable'
import { useAnonCredsCredentialDefinitions } from '../../../contexts/AnonCredsCredentialDefinitionProvider'
import { useAnonCredsSchemas } from '../../../contexts/AnonCredsSchemaProvider'
import { openCreateCredentialDefinitionModal } from '../../../modals/CreateCredentialDefinitionModal'
import { openCreateSchemaModal } from '../../../modals/CreateSchemaModal'

export const AnonCredsScreen = () => {
  const { schemas, loading: schemasLoading } = useAnonCredsSchemas()
  const { credentialDefinitions, loading: credentialDefinitionsLoading } = useAnonCredsCredentialDefinitions()

  const isLoading = schemasLoading || credentialDefinitionsLoading

  return (
    <>
      <Header title="Templates" description="Create and manage schemas and credential definitions." />
      {isLoading && <Loading />}

      {!isLoading && (
        <>
          {schemas.length === 0 ? (
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
              <AnonCredsSchemaTable records={schemas} />
            </Card>
          )}
          <Space h="xl" />
          {credentialDefinitions.length === 0 ? (
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
              <AnonCredsCredentialDefinitionTable records={credentialDefinitions} />
            </Card>
          )}
        </>
      )}
    </>
  )
}
