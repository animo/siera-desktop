import type { CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'
import { useAgent, useConnections, useCredentials } from '@aries-framework/react-hooks'
import { Title } from '@mantine/core'
import React from 'react'

import { Loading } from '../../../components/Loading'
import { CredentialsTable } from '../../../components/credentials/CredentialsTable'

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
      <Title size="h2" mb={20}>
        Credentials
      </Title>
      <div>
        {credentialsLoading || connectionsLoading ? (
          <Loading />
        ) : (
          <CredentialsTable
            records={credentialRecords}
            connections={connectionRecords}
            onDelete={(credential) => agent?.credentials.deleteById(credential.id)}
            onAccept={(credential) => acceptCredential(credential)}
            onDecline={(credential) => agent?.credentials.declineOffer(credential.id)}
          />
        )}
      </div>
    </>
  )
}