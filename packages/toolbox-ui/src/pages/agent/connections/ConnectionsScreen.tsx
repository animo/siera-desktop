import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Button, Flex, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import React from 'react'

import { Loading } from '../../../components/Loading'

interface ConnectionInviteValues {
  url: string
}

export const ConnectionsScreen = () => {
  const form = useForm<ConnectionInviteValues>()
  const { agent } = useAgent()
  const { records: connectionRecords, loading: connectionLoading } = useConnections()

  const receiveInvite = async ({ url }: ConnectionInviteValues) => {
    await agent?.oob.receiveInvitationFromUrl(url)
  }

  return (
    <>
      <Title size="h2">Connections</Title>
      <form onSubmit={form.onSubmit(receiveInvite)}>
        <Flex>
          <TextInput {...form.getInputProps('url')} />
          <Button type="submit">Receive invite</Button>
        </Flex>
      </form>
      <div>{connectionLoading ? <Loading /> : JSON.stringify(connectionRecords)}</div>
    </>
  )
}
