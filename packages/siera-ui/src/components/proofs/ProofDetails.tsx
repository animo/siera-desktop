import type { FormattedProofData } from '../../contexts/ProofsFormatDataProvider'
import type { CredentialDetails } from '../credentials/CredentialCard'

import { capitalize } from '@animo/siera-core'
import { useAgent } from '@aries-framework/react-hooks'
import { Flex, Title } from '@mantine/core'
import { Prism } from '@mantine/prism'
import React, { useEffect, useState } from 'react'

import { CredentialCard } from '../credentials/CredentialCard'
import { InformationCollapse } from '../generic/information/InformationCollapse'

interface ProofDetailsProps {
  formattedProofData: FormattedProofData
}

export const ProofDetails = ({ formattedProofData }: ProofDetailsProps) => {
  const { agent } = useAgent()
  const [credentialDetails, setCredentialDetails] = useState<CredentialDetails[]>([])

  useEffect(() => {
    void (async () => {
      if (!agent) return

      const requestedCredentials = await agent.proofs.autoSelectCredentialsForProofRequest({
        proofRecordId: formattedProofData.id,
      })

      const requestedAttributes = requestedCredentials.proofFormats.indy?.requestedAttributes ?? {}

      const requestedInformation = Object.entries(formattedProofData.request?.indy?.requested_attributes ?? {})
        .map(([key, proofAttributes]) => {
          const requestedAttribute = requestedAttributes[key]
          if (!requestedAttribute) return

          const credentialInfo = requestedAttribute.credentialInfo
          if (!credentialInfo) return

          return {
            credentialId: credentialInfo.referent,
            credentialName: key,
            credentialAttributes: Object.entries(credentialInfo.attributes).filter(([key]) =>
              proofAttributes.names?.includes(key)
            ),
          }
        })
        .filter(Boolean) as CredentialDetails[]

      setCredentialDetails(requestedInformation)
    })()
  }, [formattedProofData.id, agent])

  return (
    <Flex direction="column" gap="md">
      <Flex direction="column" gap="lg">
        {credentialDetails.map((credentialDetails) => (
          <CredentialCard key={credentialDetails.credentialId} credentialDetails={credentialDetails} />
        ))}
      </Flex>
      <InformationCollapse title="Raw Proof request">
        <Flex direction="column" gap="md">
          {Object.entries(formattedProofData).map(([key, value]) => (
            <Flex direction="column" key={key} gap="xs">
              <Title size="h5">{capitalize(key)}</Title>
              {value ? (
                <Prism language="json" noCopy>
                  {JSON.stringify(value, null, 2)}
                </Prism>
              ) : (
                <Prism language="javascript" noCopy>
                  {value == null ? 'null' : 'undefined'}
                </Prism>
              )}
            </Flex>
          ))}
        </Flex>
      </InformationCollapse>
    </Flex>
  )
}
