import type { CredentialExchangeRecord, ConnectionRecord } from '@aries-framework/core'

import { ActionIcon, Avatar, Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import { IconCheck, IconTrash } from '@tabler/icons'
import React from 'react'

interface CredentialsTableProps {
  records: CredentialExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (credential: CredentialExchangeRecord) => void
  onAccept: (credential: CredentialExchangeRecord) => void
}

export const CredentialsTable = ({ records, connections, onDelete, onAccept }: CredentialsTableProps) => {
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
            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm">
                    <Avatar size={30} radius={30} src={connection?.imageUrl}>
                      {connection?.theirLabel?.substr(0, 1)}
                    </Avatar>
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
                    <ActionIcon color="green">
                      <IconCheck size={16} stroke={1.5} onClick={() => onAccept(record)} />
                    </ActionIcon>
                    <ActionIcon color="red" onClick={() => onDelete(record)}>
                      <IconTrash size={16} stroke={1.5} />
                    </ActionIcon>
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
