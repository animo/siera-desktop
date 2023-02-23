import { useAgent, useConnections } from '@aries-framework/react-hooks'
import { Group, Space, TextInput } from '@mantine/core'
import { useForm } from '@mantine/form'
import { showNotification } from '@mantine/notifications'
import React from 'react'

import { Card } from '../../../components/Card'
import { Header } from '../../../components/Header'
import { Loading } from '../../../components/Loading'
import { ConnectionsTable } from '../../../components/connections/ConnectionsTable'
import { PrimaryButton, SecondaryButton } from '../../../components/generic'
import { openPresentInviteModal } from '../../../modals'

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

    openPresentInviteModal(url)
  }

  return (
    <>
      <Header
        title="Connections"
        description="Create or receive new invitations and setup connections."
        actions={
          <PrimaryButton onClick={() => createInvite()} withPlusIcon>
            Create connection
          </PrimaryButton>
        }
      />
      <Card title="Receive invitations" description="Paste in the invitation url to receive a invitation." withPadding>
        <form onSubmit={form.onSubmit(receiveInvite)}>
          <Group>
            <TextInput placeholder="https://example.com/?c_i=abc" {...form.getInputProps('url')} required />
            <SecondaryButton type="submit">Receive</SecondaryButton>
          </Group>
        </form>
      </Card>
      <Space h="xl" />
      {connectionLoading ? (
        <Loading />
      ) : (
        <Card title="Connection history">
          <ConnectionsTable
            records={connectionRecords}
            onDelete={(connection) => agent?.connections.deleteById(connection.id)}
            onAccept={(connection) => acceptRequest(connection.id)}
            onDecline={(connection) => declineRequest(connection.id)}
          />
        </Card>
      )}
    </>
  )
}
