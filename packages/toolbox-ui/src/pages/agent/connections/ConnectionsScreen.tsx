import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Flex, TextInput, Title } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import React from 'react'

import { Loading } from '../../../components/Loading'
import { ConnectionsTable } from '../../../components/connections/ConnectionsTable'
import { PrimaryButton } from '../../../components/generic'

interface ConnectionInviteValues {
  url: string
}

export const ConnectionsScreen = () => {
  const form = useForm<ConnectionInviteValues>({ initialValues: { url: '' } })
  const { agent } = useAgent()
  const { records: connectionRecords, loading: connectionLoading } = useConnections()

  const receiveInvite = async ({ url }: ConnectionInviteValues) => {
    await agent?.oob.receiveInvitationFromUrl(url)
  }

  const acceptRequest = async (connectionId: string) => {
    await agent?.connections.acceptRequest(connectionId)
  }

  const declineRequest = async (connectionId: string) => {
    await agent?.connections.deleteById(connectionId)
  }

  const createInvite = async () => {
    const invite = await agent?.oob.createLegacyInvitation()

    if (!invite) {
      showNotification({
        title: 'Error',
        message: 'Could not create invitation',
        color: 'red',
      })
      return
    }

    const url = invite.invitation.toUrl({ domain: 'https://example.com' })

    openContextModal({
      modal: 'presentInvite',
      title: 'Connection invitation',
      innerProps: {
        inviteUrl: url,
      },
    })
  }

  return (
    <>
      <Title size="h2" mb={20}>
        Connections
      </Title>
      <form onSubmit={form.onSubmit(receiveInvite)}>
        <Flex gap={10} mb={20}>
          <TextInput placeholder="Invite url" {...form.getInputProps('url')} />
          <PrimaryButton type="submit">Receive invite</PrimaryButton>
          <PrimaryButton onClick={() => createInvite()}>Create Invite</PrimaryButton>
        </Flex>
      </form>
      <div>
        {connectionLoading ? (
          <Loading />
        ) : (
          <ConnectionsTable
            records={connectionRecords}
            onDelete={(connection) => agent?.connections.deleteById(connection.id)}
            onAccept={(connection) => acceptRequest(connection.id)}
            onDecline={(connection) => declineRequest(connection.id)}
          />
        )}
      </div>
    </>
  )
}
