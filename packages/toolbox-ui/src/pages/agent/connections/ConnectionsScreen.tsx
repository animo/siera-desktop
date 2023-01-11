import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Box, createStyles, Flex, TextInput, Title, Tooltip } from '@mantine/core'
import { useForm } from '@mantine/form'
import { openContextModal } from '@mantine/modals'
import { showNotification } from '@mantine/notifications'
import { IconPlus } from '@tabler/icons'
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
        color: 'error',
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
      <Title size="h2" mb="xs">
        Connections
      </Title>
      <form onSubmit={form.onSubmit(receiveInvite)}>
        <Flex gap="xs" mb="xs">
          <TextInput placeholder="Invite url" {...form.getInputProps('url')} required />
          <PrimaryButton type="submit">Receive invite</PrimaryButton>
          <PrimaryButton onClick={() => createInvite()}>Create Invite</PrimaryButton>
        </Flex>
      </form>
      <Box>
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
      </Box>
    </>
  )
}
