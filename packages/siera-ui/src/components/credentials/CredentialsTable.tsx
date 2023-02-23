import type { ConnectionRecord, CredentialExchangeRecord } from '@aries-framework/core'

import { formatSchemaName } from '@animo/siera-core/src/utils'
import { CredentialsUtil } from '@animo/siera-core/src/utils/records/CredentialsUtil'
import { createStyles, Group, ScrollArea, Stack, Table, Text } from '@mantine/core'
import React from 'react'

import { useCredentialsFormatData } from '../../contexts/CredentialFormatDataProvider'
import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { EmptyState } from '../generic/table/EmptyState'
import { StatusBadge } from '../generic/table/StatusBadge'
import { TableHead } from '../generic/table/TableHeader'

interface CredentialsTableProps {
  records: CredentialExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (credential: CredentialExchangeRecord) => void
  onDecline: (credential: CredentialExchangeRecord) => void
  onAccept: (credential: CredentialExchangeRecord) => void
}

const useStyles = createStyles((theme) => ({
  table: {
    width: '100%',
    minWidth: 490,
    tableLayout: 'fixed',
  },
  clickableTitle: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.textOne[6],
    },
  },
}))

export const CredentialsTable = ({ records, connections, onDelete, onAccept, onDecline }: CredentialsTableProps) => {
  const { classes } = useStyles()
  const { formattedData } = useCredentialsFormatData()
  const navigation = useNavigation()

  const selectRow = (record: CredentialExchangeRecord) => {
    navigation.navigate(`/agent/credentials/{credentialId}`, {
      credentialId: record.id,
    })
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <TableHead
          columns={[
            { label: 'Credential', size: 150 },
            { label: 'State', size: 100 },
            { label: 'Actions', blank: true, size: 160 },
          ]}
        />
        <tbody>
          {records.length === 0 && (
            <tr>
              <td colSpan={3}>
                <EmptyState message="No credentials found" />
              </td>
            </tr>
          )}
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id == record.connectionId)
            const formattedCredential = formattedData.find((data) => data.id === record.id)
            const isLoading = CredentialsUtil.isCredentialWaitingForResponse(record)
            const isWaitingForAccept = CredentialsUtil.isCredentialWaitingForAcceptInput(record)
            const isWaitingForDecline = CredentialsUtil.isCredentialWaitingForDeclineInput(record)

            const lastUpdated = record.updatedAt ?? record.createdAt

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {connection?.theirLabel}
                    </SmartAvatar>
                    <Stack spacing={0}>
                      <Text size="sm" weight={500} className={classes.clickableTitle} onClick={() => selectRow(record)}>
                        {formatSchemaName(formattedCredential?.offer?.indy?.schema_id)}
                      </Text>
                      <Text size="xs" color="dimmed">
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
