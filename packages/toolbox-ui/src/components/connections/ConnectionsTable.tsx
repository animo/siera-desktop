import type { ConnectionRecord } from '@aries-framework/core'

import { DidExchangeState } from '@aries-framework/core'
import { Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'

interface ConnectionsTableProps {
  records: ConnectionRecord[]
  onDelete: (connection: ConnectionRecord) => void
  onAccept: (connection: ConnectionRecord) => void
}

export const ConnectionsTable = ({ records, onDelete, onAccept }: ConnectionsTableProps) => {
  const theme = useMantineTheme()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Connection</th>
            <th>Connection Id</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const recordState = record.state

            const isLoading =
              recordState === DidExchangeState.RequestSent ||
              recordState === DidExchangeState.ResponseSent ||
              recordState === DidExchangeState.InvitationSent

            const isAcceptable = recordState === DidExchangeState.InvitationReceived

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm">
                    <SmartAvatar size={30} src={record.imageUrl} radius={30}>
                      {record.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {record.theirLabel}
                    </Text>
                  </Group>
                </td>
                <td>
                  <Text size="sm" weight={500}>
                    {record.id}
                  </Text>
                </td>
                <td>
                  <Badge variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>{record.state}</Badge>
                </td>
                <td>
                  <RecordActions
                    onAccept={() => onAccept(record)}
                    onDelete={() => onDelete(record)}
                    isLoading={isLoading}
                    isAcceptable={isAcceptable}
                  />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
