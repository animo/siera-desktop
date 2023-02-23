import type { ConnectionRecord } from '@aries-framework/core'

import { ConnectionsUtil } from '@animo/siera-core/src/utils/records/ConnectionsUtil'
import { createStyles, Group, ScrollArea, Table, Text } from '@mantine/core'
import React from 'react'

import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { EmptyState } from '../generic/table/EmptyState'
import { StatusBadge } from '../generic/table/StatusBadge'
import { TableHead } from '../generic/table/TableHeader'

interface ConnectionsTableProps {
  records: ConnectionRecord[]
  onDelete: (connection: ConnectionRecord) => void
  onAccept: (connection: ConnectionRecord) => void
  onDecline: (connection: ConnectionRecord) => void
}

const useStyles = createStyles((theme) => ({
  table: {
    width: '100%',
    minWidth: 870,
    tableLayout: 'fixed',
  },
  clickableTitle: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.textOne[6],
    },
  },
}))

export const ConnectionsTable = ({ records, onDelete, onAccept, onDecline }: ConnectionsTableProps) => {
  const { classes } = useStyles()
  const navigation = useNavigation()

  const selectRow = (record: ConnectionRecord) => {
    navigation.navigate(`/agent/connections/{connectionId}`, {
      connectionId: record.id,
    })
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <TableHead
          columns={[
            { label: 'Connection', size: 150 },
            { label: 'Connection identifier', size: 200 },
            { label: 'State', size: 100 },
            { label: 'Actions', blank: true, size: 160 },
          ]}
        />
        <tbody>
          {records.length === 0 && (
            <tr>
              <td colSpan={4}>
                <EmptyState message="No connections found" />
              </td>
            </tr>
          )}
          {records.map((record: ConnectionRecord) => {
            const isLoading = ConnectionsUtil.isConnectionWaitingForResponse(record)
            const isWaitingForAccept = ConnectionsUtil.isConnectionWaitingForAcceptInput(record)
            const isWaitingForDecline = ConnectionsUtil.isConnectionWaitingForDeclineInput(record)

            const lastUpdated = record.updatedAt ?? record.createdAt

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} src={record.imageUrl} radius={30}>
                      {record.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500} className={classes.clickableTitle} onClick={() => selectRow(record)}>
                      {record.theirLabel}
                    </Text>
                  </Group>
                </td>
                <td>
                  <Text size="sm" weight={500}>
                    {record.id}
                  </Text>
                  <Text color="dimmed" size="xs">
                    Last updated {lastUpdated.toLocaleString()}
                  </Text>
                </td>
                <td>
                  <StatusBadge>{record.state}</StatusBadge>
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
