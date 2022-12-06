import type { ConnectionRecord, ProofExchangeRecord } from '@aries-framework/core'

import { ProofState } from '@aries-framework/core'
import { Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'

interface ProofsTableProps {
  records: ProofExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (proof: ProofExchangeRecord) => void
  onAccept: (proof: ProofExchangeRecord) => void
  onDecline: (proof: ProofExchangeRecord) => void
}

export const ProofsTable = ({ records, connections, onDelete, onAccept, onDecline }: ProofsTableProps) => {
  const theme = useMantineTheme()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Connection</th>
            <th>Proof Id</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id === record.connectionId)
            const recordState = record.state

            const isDeclineable = recordState === ProofState.RequestReceived

            const isAcceptable = recordState === ProofState.RequestReceived

            const isLoading = recordState === ProofState.PresentationSent || recordState === ProofState.RequestSent

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm">
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {connection?.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {connection?.theirLabel}
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
                  <Group spacing={0} position="right">
                    <RecordActions
                      onDecline={() => onDecline(record)}
                      onAccept={() => onAccept(record)}
                      onDelete={() => onDelete(record)}
                      isAcceptable={isAcceptable}
                      isDeclineable={isDeclineable}
                      isLoading={isLoading}
                    />
                  </Group>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
