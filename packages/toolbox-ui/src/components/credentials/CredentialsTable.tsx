import type { ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialState } from '@aries-framework/core'
import { Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'

interface CredentialsTableProps {
  records: CredentialExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (credential: CredentialExchangeRecord) => void
  onDecline: (credential: CredentialExchangeRecord) => void
  onAccept: (credential: CredentialExchangeRecord) => void
}

export const CredentialsTable = ({ records, connections, onDelete, onAccept, onDecline }: CredentialsTableProps) => {
  const theme = useMantineTheme()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Issuer</th>
            <th>Credential Id</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id == record.connectionId)

            const recordState = record.state

            const isLoading = recordState === CredentialState.RequestSent || recordState === CredentialState.OfferSent

            const isDeclineable = recordState === CredentialState.OfferReceived

            const isAcceptable =
              recordState === CredentialState.OfferReceived || recordState === CredentialState.CredentialReceived

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
                  <RecordActions
                    onDecline={() => onDecline(record)}
                    onAccept={() => onAccept(record)}
                    onDelete={() => onDelete(record)}
                    isAcceptable={isAcceptable}
                    isDeclineable={isDeclineable}
                    isLoading={isLoading}
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
