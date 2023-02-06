import type { FormattedData } from '../../contexts/CredentialFormatDataProvider'

import { capitalize } from '@animo/siera-core'
import { Flex, Title } from '@mantine/core'
import { Prism } from '@mantine/prism'
import React from 'react'

interface CredentialDetailsParams {
  credentialFormatted: FormattedData
}
export const CredentialDetails = ({ credentialFormatted }: CredentialDetailsParams) => {
  if (credentialFormatted.offerAttributes == null) {
    return <div>There are no attributes</div>
  }

  return (
    <Flex direction="column" gap="md">
      {credentialFormatted.offerAttributes.map(({ name, value }) => (
        <Flex direction="column" key={name} gap="xs">
          <Title size="h5">{capitalize(name)}</Title>
          {value ? (
            <Prism language="json" noCopy>
              {JSON.stringify(value, null, 2)}
            </Prism>
          ) : (
            <Prism language="javascript">{value == null ? 'null' : 'undefined'}</Prism>
          )}
        </Flex>
      ))}
    </Flex>
  )
}
