import type { ConnectionRecord, ProofExchangeRecord } from '@aries-framework/core'

import { ProofsUtil } from '@animo/siera-core/src/utils/records/ProofsUtil'
import { createStyles, Group, ScrollArea, Table, Text } from '@mantine/core'
import React from 'react'

import { useProofsFormatData } from '../../contexts/ProofsFormatDataProvider'
import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'
import { EmptyState } from '../generic/table/EmptyState'
import { StatusBadge } from '../generic/table/StatusBadge'

interface ProofsTableProps {
  records: ProofExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (proof: ProofExchangeRecord) => void
  onAccept: (proof: ProofExchangeRecord) => void
  onDecline: (proof: ProofExchangeRecord) => void
}

const useStyles = createStyles((theme) => ({
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
  clickableTitle: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.colors.textOne[6],
    },
  },
}))

export const ProofsTable = ({ records, connections, onDelete, onAccept, onDecline }: ProofsTableProps) => {
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
        <thead>
          <tr>
            <th className={classes.labelSize}>Connection</th>
            <th className={classes.idSize}>Proof</th>
            <th className={classes.stateSize}>State</th>
            <th className={classes.actionsSize} />
          </tr>
        </thead>
        <tbody>
          {records.length === 0 && (
            <tr>
              <td colSpan={4}>
                <EmptyState message="No proofs found" />
              </td>
            </tr>
          )}
          {records.map((record) => {
            const connection = connections.find((connection) => connection.id === record.connectionId)
            const formattedProof = formattedData.find((proof) => proof.id === record.id)
            const isLoading = ProofsUtil.isProofWaitingForResponse(record)
            const isWaitingForAccept = ProofsUtil.isProofWaitingForAcceptInput(record)
            const isWaitingForDecline = ProofsUtil.isProofWaitingForDeclineInput(record)

            const proofName = formattedProof?.request?.indy?.name

            return (
              <tr key={record.id}>
                <td className={classes.labelSize}>
                  <Group spacing="sm" noWrap>
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {proofName}
                    </SmartAvatar>
                    <Text size="sm" weight={500} className={classes.clickableTitle} onClick={() => selectRow(record)}>
                      {proofName}
                    </Text>
                  </Group>
                </td>
                <td className={classes.idSize}>
                  <Text size="sm" weight={500}>
                    {record.id}
                  </Text>
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
