import type { ConnectionRecord } from '@aries-framework/core'

import { capitalize } from '@animo/siera-core'
import { Title, Flex } from '@mantine/core'
import { Prism } from '@mantine/prism'
import React from 'react'

interface ConnectionDetailsParams {
  connectionRecord: ConnectionRecord
}

export const ConnectionDetails = ({ connectionRecord }: ConnectionDetailsParams) => {
  return (
    <Flex direction="column" gap="md">
      {Object.entries(connectionRecord).map(([key, value]) => (
        <Flex direction="column" key={key} gap="xs">
          <Title size="h5">{capitalize(key)}</Title>
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
