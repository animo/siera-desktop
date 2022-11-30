import type { ConnectionRecord, ProofExchangeRecord } from '@aries-framework/core'

import { ActionIcon, Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import { IconCheck, IconTrash } from '@tabler/icons'
import React from 'react'

import { SmartAvatar } from '../SmartAvatar'

interface ProofsTableProps {
  records: ProofExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (proof: ProofExchangeRecord) => void
  onAccept: (proof: ProofExchangeRecord) => void
}

export const ProofsTable = ({ records, connections, onDelete, onAccept }: ProofsTableProps) => {
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
                    <ActionIcon color="green" onClick={() => onAccept(record)}>
                      <IconCheck size={16} stroke={1.5} />
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
