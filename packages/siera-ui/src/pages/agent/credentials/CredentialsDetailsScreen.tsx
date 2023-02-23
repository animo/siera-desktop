import { Space } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'

import { CredentialDetails } from '../../../components/credentials/CredentialDetails'
import { SmallBackButton } from '../../../components/generic'
import { useCredentialFormatDataById } from '../../../contexts/CredentialFormatDataProvider'

const CredentialNotFound = () => {
  return (
    <>
      <SmallBackButton />
      <div>Credential not found</div>
    </>
  )
}

export const CredentialsDetailsScreen = () => {
  const { credentialId } = useParams()
  if (!credentialId) {
    return <CredentialNotFound />
  }

  const formattedCredential = useCredentialFormatDataById(credentialId)
  if (!formattedCredential) {
    return <CredentialNotFound />
  }

  return (
    <>
      <Space h="md" />
      <SmallBackButton>Credentials</SmallBackButton>
      <Space h="md" />
      <CredentialDetails credentialFormatted={formattedCredential} />
    </>
  )
}
