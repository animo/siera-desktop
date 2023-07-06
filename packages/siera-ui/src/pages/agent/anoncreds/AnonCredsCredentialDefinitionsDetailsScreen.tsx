import { Space } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'

import { AnonCredsCredentialDefinitionDetails } from '../../../components/credential-definitions/AnonCredsCredentialDefinitionDetails'
import { SmallBackButton } from '../../../components/generic'
import { useAnonCredsCredentialDefinitionById } from '../../../contexts/AnonCredsCredentialDefinitionProvider'

const CredentialDefinitionNotFound = () => {
  return (
    <>
      <SmallBackButton />
      <div>Credential Definition not found</div>
    </>
  )
}

export const AnonCredsCredentialDefinitionsDetailsScreen = () => {
  const { credentialDefinitionId } = useParams()
  if (!credentialDefinitionId) {
    return <CredentialDefinitionNotFound />
  }

  const credentialDefinition = useAnonCredsCredentialDefinitionById(credentialDefinitionId)
  if (!credentialDefinition) {
    return <CredentialDefinitionNotFound />
  }

  return (
    <>
      <Space h="md" />
      <SmallBackButton>Templates</SmallBackButton>
      <Space h="md" />
      <AnonCredsCredentialDefinitionDetails credentialDefinition={credentialDefinition} />
    </>
  )
}
