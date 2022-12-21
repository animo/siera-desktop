import type { ConnectionRecord } from '@aries-framework/core'

import { ConnectionsUtil } from '@animo/toolbox-core/src/utils/records/ConnectionsUtil'
import { Badge, createStyles, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'

interface ConnectionsTableProps {
  records: ConnectionRecord[]
  onDelete: (connection: ConnectionRecord) => void
  onAccept: (connection: ConnectionRecord) => void
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 870,
    tableLayout: 'fixed',
  },
  labelSize: {
    width: 150,
  },
  idSize: {
    width: 200,
  },
  stateSize: {
    width: 100,
  },
  actionsSize: {
    width: 160,
  },
}))

export const ConnectionsTable = ({ records, onDelete, onAccept }: ConnectionsTableProps) => {
  const { classes } = useStyles()
  const theme = useMantineTheme()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <thead>
          <tr>
            <th className={classes.labelSize}>Connection</th>
            <th className={classes.idSize}>Connection Id</th>
            <th className={classes.stateSize}>State</th>
            <th className={classes.actionsSize} />
          </tr>
        </thead>
        <tbody>
          {records.map((record: ConnectionRecord) => {
            const isLoading = ConnectionsUtil.isConnectionWaitingForResponse(record)
            const isWaitingForAccept = ConnectionsUtil.isConnectionWaitingForAcceptInput(record)

            return (
              <tr key={record.id}>
                <td className={classes.labelSize}>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} src={record.imageUrl} radius={30}>
                      {record.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {record.theirLabel}
                    </Text>
                  </Group>
                </td>
                <td className={classes.idSize}>
                  <Text size="sm" weight={500}>
                    {record.id}
                  </Text>
                </td>
                <td className={classes.stateSize}>
                  <Badge variant={theme.colorScheme === 'dark' ? 'light' : 'outline'}>{record.state}</Badge>
                </td>
                <td className={classes.actionsSize}>
                  <RecordActions
                    onAccept={isWaitingForAccept ? () => onAccept(record) : undefined}
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
