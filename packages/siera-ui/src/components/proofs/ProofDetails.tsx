import type { FormattedProofData } from '../../contexts/ProofsFormatDataProvider'

import { useAgent } from '@aries-framework/react-hooks'
import { createStyles, Group, SimpleGrid, Space, Stack, Title } from '@mantine/core'
import React, { useEffect, useState } from 'react'

import { Card } from '../Card'
import { Loading } from '../Loading'
import { Callout } from '../generic'
import { AttributeValue } from '../generic/information/AttributeValue'
import { RecordCodeBlock } from '../generic/information/RecordCodeBlock'

interface ProofDetailsProps {
  formattedProofData: FormattedProofData
}

export interface CredentialDetails {
  credentialId: string
  credentialName: string
  credentialAttributes: [string, string][]
}

const useStyles = createStyles(() => ({
  attributeName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export const ProofDetails = ({ formattedProofData }: ProofDetailsProps) => {
  const { classes } = useStyles()
  const { agent } = useAgent()
  const [credentialDetails, setCredentialDetails] = useState<CredentialDetails[] | null>(null)
  const [noSuitableCredentialsFound, setNoSuitableCredentialsFound] = useState(false)

  useEffect(() => {
    void (async () => {
      if (!agent) return

      const requestedCredentials = await agent.proofs
        .autoSelectCredentialsForProofRequest({
          proofRecordId: formattedProofData.id,
        })
        .catch(() => setNoSuitableCredentialsFound(true))
      if (!requestedCredentials) return

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

  const proofRequestName = formattedProofData.request?.indy?.name ?? 'No name'

  return (
    <Card
      title={proofRequestName}
      titleSize="h2"
      description={
        !noSuitableCredentialsFound ? 'The following credentials were used to satisfy the proof request.' : undefined
      }
      descriptionSize="md"
      withPadding
    >
      <Space h="xl" />
      {noSuitableCredentialsFound ? (
        <Callout
          title="No suitable credentials found"
          titleSize="h5"
          description="No credential were found to satisfy the proof request."
          variant="error"
        />
      ) : credentialDetails == null ? (
        <Loading />
      ) : (
        <Stack>
          {credentialDetails.map((credentialDetail) => (
            <Stack key={credentialDetail.credentialId} spacing={0}>
              <Title size="h3">{credentialDetail.credentialName}</Title>
              <SimpleGrid cols={2} mt="md" mb="xl">
                {credentialDetail.credentialAttributes.map(([name, value]: [string, unknown]) => (
                  <Group key={name} noWrap>
                    <Title size="h6" className={classes.attributeName} w={120}>
                      {name}
                    </Title>
                    <AttributeValue value={value} />
                  </Group>
                ))}
              </SimpleGrid>
            </Stack>
          ))}
        </Stack>
      )}

      <Space h="xl" />

      <Title size="h3" mb="xs">
        Record
      </Title>
      <RecordCodeBlock record={formattedProofData} />
    </Card>
  )
}
