import type { CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'
import { useAgent, useConnections, useCredentialByState, useCredentials } from '@aries-framework/react-hooks'
import { Space } from '@mantine/core'
import React from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { CredentialsTable } from '../../../components/credentials/CredentialsTable'
import { PrimaryButton } from '../../../components/generic'
import { EmptyState } from '../../../components/generic/table/EmptyState'
import { openIssueCredentialModal } from '../../../modals/IssueCredentialModal'

export const CredentialsScreen = () => {
  const { loading: credentialsLoading } = useCredentials()
  const issuerCredentialRecords = useCredentialByState([
    CredentialState.OfferSent,
    CredentialState.RequestReceived,
    CredentialState.CredentialIssued,
    CredentialState.ProposalReceived,
    CredentialState.Done,
  ]).filter((c) => c.state !== CredentialState.Done || c.metadata.get('role')?.role === 'issuer')

  const holderCredentialRecords = useCredentialByState([
    CredentialState.Declined,
    CredentialState.OfferReceived,
    CredentialState.RequestSent,
    CredentialState.CredentialReceived,
    CredentialState.ProposalSent,
    CredentialState.Done,
  ]).filter((c) => c.state !== CredentialState.Done || c.metadata.get('role')?.role !== 'issuer')

  const { records: connectionRecords, loading: connectionsLoading } = useConnections()
  const { agent } = useAgent()

  const acceptCredential = (credential: CredentialExchangeRecord) => {
    agent?.credentials.acceptOffer({
      credentialRecordId: credential.id,
    })
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
      {(credentialsLoading || connectionsLoading) && <Loading />}

      {holderCredentialRecords.length === 0 ? (
        <EmptyState title="No credentials received" message="You haven't received any credentials yet." withCard />
      ) : (
        <Card title="Received credentials">
          <CredentialsTable
            records={holderCredentialRecords}
            connections={connectionRecords}
            onDelete={(credential) => agent?.credentials.deleteById(credential.id)}
            onAccept={(credential) => acceptCredential(credential)}
            onDecline={(credential) => agent?.credentials.declineOffer(credential.id)}
          />
        </Card>
      )}
      <Space h="xl" />
      {issuerCredentialRecords.length === 0 ? (
        <EmptyState title="No credentials issued" message="You haven't issued any credentials yet." withCard />
      ) : (
        <Card title="Issued credentials">
          <CredentialsTable
            records={issuerCredentialRecords}
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
