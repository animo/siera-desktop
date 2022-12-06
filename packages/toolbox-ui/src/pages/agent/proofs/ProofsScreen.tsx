import type { ProofExchangeRecord } from '@aries-framework/core'

import { useAgent, useConnections, useProofs } from '@aries-framework/react-hooks'
import { Title } from '@mantine/core'
import React from 'react'

import { Loading } from '../../../components/Loading'
import { ProofsTable } from '../../../components/proofs/ProofsTable'

export const ProofsScreen = () => {
  const { agent } = useAgent()
  const { records: proofRecords, loading: proofsLoading } = useProofs()
  const { records: connectionRecords, loading: connectionsLoading } = useConnections()

  const acceptProofRequest = async (proof: ProofExchangeRecord) => {
    const credential = await agent?.proofs.autoSelectCredentialsForProofRequest({
      proofRecordId: proof.id,
    })

    if (!credential) {
      throw new Error("Couldn't find the credential with the requested proof")
    }

    await agent?.proofs.acceptRequest({
      proofRecordId: proof.id,
      proofFormats: credential.proofFormats,
    })
  }

  const deleteProof = async (proof: ProofExchangeRecord) => {
    await agent?.proofs.deleteById(proof.id)
  }

  const declineProofRequest = async (proof: ProofExchangeRecord) => {
    await agent?.proofs.declineRequest(proof.id)
  }

  return (
    <>
      <Title size="h2">Proofs</Title>
      {proofsLoading || connectionsLoading ? (
        <Loading />
      ) : (
        <ProofsTable
          records={proofRecords}
          connections={connectionRecords}
          onDelete={deleteProof}
          onAccept={acceptProofRequest}
          onDecline={declineProofRequest}
        />
      )}
    </>
  )
}
