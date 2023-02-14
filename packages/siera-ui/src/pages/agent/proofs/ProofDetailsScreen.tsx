import React from 'react'
import { useParams } from 'react-router-dom'

import { SmallBackButton } from '../../../components/generic'
import { ProofDetails } from '../../../components/proofs/ProofDetails'
import { useProofFormatDataById } from '../../../contexts/ProofsFormatDataProvider'

const ProofNotFound = () => {
  return (
    <>
      <SmallBackButton />
      <div>Proof not found</div>
    </>
  )
}

export const ProofDetailsScreen = () => {
  const { proofId } = useParams()
  if (!proofId) {
    return <ProofNotFound />
  }

  const proofFormatted = useProofFormatDataById(proofId)
  if (!proofFormatted) {
    return <ProofNotFound />
  }

  return (
    <>
      <SmallBackButton />
      <ProofDetails formattedProofData={proofFormatted} />
    </>
  )
}
