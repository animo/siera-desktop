import type { ConnectionRecord } from '@aries-framework/core'

import { ConnectionsUtil } from '@animo/siera-core/src/utils/records/ConnectionsUtil'
import { createStyles, Group, ScrollArea, Stack, Table, Text } from '@mantine/core'
import React from 'react'

import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { useGenericTableStyle } from '../generic/table/GenericTableStyle'
import { StatusBadge } from '../generic/table/StatusBadge'
import { TableHead } from '../generic/table/TableHeader'

interface ConnectionsTableProps {
  records: ConnectionRecord[]
  onDelete: (connection: ConnectionRecord) => void
  onAccept: (connection: ConnectionRecord) => void
  onDecline: (connection: ConnectionRecord) => void
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 870,
    tableLayout: 'fixed',
  },
}))

export const ConnectionsTable = ({ records, onDelete, onAccept, onDecline }: ConnectionsTableProps) => {
  const { classes: tableStyle, cx } = useGenericTableStyle()
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
            { label: 'State', size: 100 },
            { label: 'Actions', blank: true, size: 160 },
          ]}
        />
        <tbody>
          {records.map((record: ConnectionRecord) => {
            const isLoading = ConnectionsUtil.isConnectionWaitingForResponse(record)
            const isWaitingForAccept = ConnectionsUtil.isConnectionWaitingForAcceptInput(record)
            const isWaitingForDecline = ConnectionsUtil.isConnectionWaitingForDeclineInput(record)

            const lastUpdated = record.updatedAt ?? record.createdAt

            const select = () => selectRow(record)

            return (
              <tr key={record.id} className={cx(tableStyle.clickableRow, tableStyle.row)} onClick={select}>
                <td>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} src={record.imageUrl} radius={30}>
                      {record.theirLabel}
                    </SmartAvatar>
                    <Stack spacing={0}>
                      <Text size="sm" weight={500}>
                        {record.theirLabel}
                      </Text>
                      <Text color="dimmed" size="xs">
                        Last updated {lastUpdated.toLocaleString()}
                      </Text>
                    </Stack>
                  </Group>
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
