import { useConnectionById } from '@aries-framework/react-hooks'
import { Box, Space } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'

import { Loading } from '../../../components/Loading'
import { ConnectionDetails } from '../../../components/connections/ConnectionDetails'
import { SmallBackButton } from '../../../components/generic'

export const ConnectionDetailsScreen = () => {
  const { connectionId } = useParams()

  if (!connectionId) {
    return (
      <>
        <SmallBackButton />
        <div>Connection not found</div>
      </>
    )
  }

  const connection = useConnectionById(connectionId)
  return (
    <>
      <Space h="md" />
      <SmallBackButton>Connections</SmallBackButton>
      <Space h="md" />
      <Box>{!connection ? <Loading /> : <ConnectionDetails connectionRecord={connection} />}</Box>
    </>
  )
}
