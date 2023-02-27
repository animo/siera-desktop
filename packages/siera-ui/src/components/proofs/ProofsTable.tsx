import type { ConnectionRecord, ProofExchangeRecord } from '@aries-framework/core'

import { ProofsUtil } from '@animo/siera-core/src/utils/records/ProofsUtil'
import { createStyles, Group, ScrollArea, Stack, Table, Text } from '@mantine/core'
import React from 'react'

import { useProofsFormatData } from '../../contexts/ProofsFormatDataProvider'
import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { useGenericTableStyle } from '../generic/table/GenericTableStyle'
import { StatusBadge } from '../generic/table/StatusBadge'
import { TableHead } from '../generic/table/TableHeader'

interface ProofsTableProps {
  records: ProofExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (proof: ProofExchangeRecord) => void
  onAccept: (proof: ProofExchangeRecord) => void
  onDecline: (proof: ProofExchangeRecord) => void
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 870,
    tableLayout: 'fixed',
  },
}))

export const ProofsTable = ({ records, connections, onDelete, onAccept, onDecline }: ProofsTableProps) => {
  const { classes: tableStyle } = useGenericTableStyle()
  const { classes } = useStyles()
  const { formattedData } = useProofsFormatData()
  const navigation = useNavigation()

  const selectRow = (proof: ProofExchangeRecord) => {
    navigation.navigate('/agent/proofs/{proofId}', {
      proofId: proof.id,
    })
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <TableHead
          columns={[
            { label: 'Request', size: 150 },
            { label: 'State', size: 100 },
            { label: 'Actions', blank: true, size: 160 },
          ]}
        />
        <tbody>
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id === record.connectionId)
            const formattedProof = formattedData.find((proof) => proof.id === record.id)
            const isLoading = ProofsUtil.isProofWaitingForResponse(record)
            const isWaitingForAccept = ProofsUtil.isProofWaitingForAcceptInput(record)
            const isWaitingForDecline = ProofsUtil.isProofWaitingForDeclineInput(record)

            const proofName = formattedProof?.request?.indy?.name

            const lastUpdated = record.updatedAt ?? record.createdAt

            const select = () => selectRow(record)

            return (
              <tr key={record.id} className={tableStyle.clickableRow} onClick={select}>
                <td>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {proofName}
                    </SmartAvatar>
                    <Stack spacing={0}>
                      <Text size="sm" weight={500}>
                        {proofName}
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
