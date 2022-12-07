import type { ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core'

import { CredentialUtil } from '@animo/toolbox-core/src/utils/records/CredentialUtil'
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
            const isLoading = CredentialUtil.isCredentialWaitingForResponse(record)
            const { isDeclineable, isAcceptable } = CredentialUtil.isCredentialWaitingForInput(record)

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
                    onAccept={isAcceptable ? () => onAccept(record) : undefined}
                    onDecline={isDeclineable ? () => onDecline(record) : undefined}
                    onDelete={() => onDelete(record)}
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
