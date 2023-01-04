import type { ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core'

import { formatSchemaName } from '@animo/toolbox-core/src/utils'
import { CredentialsUtil } from '@animo/toolbox-core/src/utils/records/CredentialsUtil'
import { createStyles, Group, ScrollArea, Table, Text } from '@mantine/core'
import React from 'react'

import { useCredentialsFormatData } from '../../contexts/CredentialFormatDataProvider'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { StatusBadge } from '../generic/table/StatusBadge'

interface CredentialsTableProps {
  records: CredentialExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (credential: CredentialExchangeRecord) => void
  onDecline: (credential: CredentialExchangeRecord) => void
  onAccept: (credential: CredentialExchangeRecord) => void
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 490,
    tableLayout: 'fixed',
  },
  labelSize: {
    width: 150,
  },
  stateSize: {
    width: 100,
  },
  actionsSize: {
    width: 160,
  },
}))

export const CredentialsTable = ({ records, connections, onDelete, onAccept, onDecline }: CredentialsTableProps) => {
  const { classes } = useStyles()
  const { formattedData } = useCredentialsFormatData()

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <thead>
          <tr>
            <th className={classes.labelSize}>Credential</th>
            <th className={classes.stateSize}>State</th>
            <th className={classes.actionsSize} />
          </tr>
        </thead>
        <tbody>
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id == record.connectionId)
            const formattedCredential = formattedData.find((data) => data.id === record.id)
            const isLoading = CredentialsUtil.isCredentialWaitingForResponse(record)
            const isWaitingForAccept = CredentialsUtil.isCredentialWaitingForAcceptInput(record)
            const isWaitingForDecline = CredentialsUtil.isCredentialWaitingForDeclineInput(record)

            return (
              <tr key={record.id}>
                <td className={classes.labelSize}>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {connection?.theirLabel}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {formatSchemaName(formattedCredential?.offer?.indy?.schema_id)}
                    </Text>
                  </Group>
                </td>
                <td className={classes.stateSize}>
                  <StatusBadge>{record.state}</StatusBadge>
                </td>
                <td className={classes.actionsSize}>
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
