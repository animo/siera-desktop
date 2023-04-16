import type { CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'
import { useAgent, useConnections, useCredentials } from '@aries-framework/react-hooks'
import React from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { CredentialsTable } from '../../../components/credentials/CredentialsTable'
import { PrimaryButton } from '../../../components/generic'
import { EmptyState } from '../../../components/generic/table/EmptyState'
import { openIssueCredentialModal } from '../../../modals'

export const CredentialsScreen = () => {
  const { records: credentialRecords, loading: credentialsLoading } = useCredentials()
  const { records: connectionRecords, loading: connectionsLoading } = useConnections()
  const { agent } = useAgent()

  const acceptCredential = (credential: CredentialExchangeRecord) => {
    if (credential.state === CredentialState.OfferReceived) {
      agent?.credentials.acceptOffer({
        credentialRecordId: credential.id,
      })
    }

    if (credential.state === CredentialState.CredentialReceived) {
      agent?.credentials.acceptCredential({
        credentialRecordId: credential.id,
      })
    }
  }

  return (
    <>
      <Header
        title="Credentials"
        description="Accept and manage your credentials or issue credentials to other agents."
        actions={
          <PrimaryButton onClick={openIssueCredentialModal} withPlusIcon>
            Issue Credential
          </PrimaryButton>
        }
      />
      {credentialsLoading || connectionsLoading ? (
        <Loading />
      ) : credentialRecords.length === 0 ? (
        <EmptyState title="No credentials received" message="You haven't received any credentials yet." withCard />
      ) : (
        <Card title="Received credentials">
          <CredentialsTable
            records={credentialRecords}
            connections={connectionRecords}
            onDelete={(credential) => agent?.credentials.deleteById(credential.id)}
            onAccept={(credential) => acceptCredential(credential)}
            onDecline={(credential) => agent?.credentials.declineOffer(credential.id)}
          />
        </Card>
      )}
    </>
  )
}
