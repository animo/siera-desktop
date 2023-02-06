import React from 'react'
import { useParams } from 'react-router-dom'

import { CredentialDetails } from '../../../components/credentials/CredentialDetails'
import { SmallBackButton } from '../../../components/generic'
import { useCredentialFormatDataById } from '../../../contexts/CredentialFormatDataProvider'

export const CredentialsDetailsScreen = () => {
  const { credentialId } = useParams()
  if (!credentialId) {
    return (
      <>
        <SmallBackButton />
        <div>Credential not found</div>
      </>
    )
  }

  const formattedCredential = useCredentialFormatDataById(credentialId)

  if (!formattedCredential) {
    return (
      <>
        <SmallBackButton />
        <div>Credential not found</div>
      </>
    )
  }

  return (
    <>
      <SmallBackButton />
      <CredentialDetails credentialFormatted={formattedCredential} />
    </>
  )
}
