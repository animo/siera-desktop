import type { ConnectionRecord } from '@aries-framework/core'

import { ActionIcon, Avatar, Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import { IconPencil, IconTrash } from '@tabler/icons'
import React from 'react'

interface ConnectionsTableProps {
  records: ConnectionRecord[]
  onDelete: (connection: ConnectionRecord) => void
}

export const ConnectionsTable = ({ records, onDelete }: ConnectionsTableProps) => {
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
          {records.map((record) => (
            <tr key={record.id}>
              <td>
                <Group spacing="sm">
                  <Avatar size={30} src={record.imageUrl} radius={30}>
                    {record.theirLabel?.substr(0, 1)}
                  </Avatar>
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
                <Group spacing={0} position="right">
                  <ActionIcon>
                    <IconPencil size={16} stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon color="red" onClick={() => onDelete(record)}>
                    <IconTrash size={16} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
