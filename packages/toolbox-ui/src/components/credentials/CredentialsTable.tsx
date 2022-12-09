import type { ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core'

import { formatSchemaName } from '@animo/toolbox-core/src/utils'
import { CredentialsUtil } from '@animo/toolbox-core/src/utils/records/CredentialsUtil'
import { Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { useCredentialsFormatData } from '../../contexts/CredentialFormatDataProvider'
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
  const { formattedData } = useCredentialsFormatData()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm">
        <thead>
          <tr>
            <th>Credential</th>
            <th>State</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {records.map((record: CredentialExchangeRecord) => {
            const connection = connections.find((connection) => connection.id == record.connectionId)
            const formattedCredential = formattedData.find((data) => data.id === record.id)
            const isLoading = CredentialsUtil.isCredentialWaitingForResponse(record)
            const isWaitingForAccept = CredentialsUtil.isCredentialWaitingForAcceptInput(record)
            const isWaitingForDecline = CredentialsUtil.isCredentialWaitingForDeclineInput(record)

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm">
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {connection?.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {formatSchemaName(formattedCredential?.offer?.indy?.schema_id)}
                    </Text>
                  </Group>
                </td>
                <td>
                  <Badge variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>{record.state}</Badge>
                </td>
                <td>
                  <RecordActions
                    onAccept={isWaitingForAccept ? () => onAccept(record) : undefined}
                    onDecline={isWaitingForDecline ? () => onDecline(record) : undefined}
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
