import type { ConnectionRecord, ProofExchangeRecord } from '@aries-framework/core'

import { ProofsUtil } from '@animo/toolbox-core/src/utils/records/ProofsUtil'
import { Badge, Group, ScrollArea, Table, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

import { useProofsFormatData } from '../../contexts/ProofsFormatDataProvider'
import { RecordActions } from '../RecordActions'
import { SmartAvatar } from '../SmartAvatar'

interface ProofsTableProps {
  records: ProofExchangeRecord[]
  connections: ConnectionRecord[]
  onDelete: (proof: ProofExchangeRecord) => void
  onAccept: (proof: ProofExchangeRecord) => void
  onDecline: (proof: ProofExchangeRecord) => void
}

export const ProofsTable = ({ records, connections, onDelete, onAccept, onDecline }: ProofsTableProps) => {
  const theme = useMantineTheme()
  const { formattedData } = useProofsFormatData()

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
            const formattedProof = formattedData.find((proof) => proof.id === record.id)
            const isLoading = ProofsUtil.isProofWaitingForResponse(record)
            const isWaitingForAccept = ProofsUtil.isProofWaitingForAcceptInput(record)
            const isWaitingForDecline = ProofsUtil.isProofWaitingForDeclineInput(record)

            const proofName = formattedProof?.request?.indy?.name

            return (
              <tr key={record.id}>
                <td>
                  <Group spacing="sm">
                    <SmartAvatar size={30} radius={30} src={connection?.imageUrl}>
                      {proofName}
                    </SmartAvatar>
                    <Text size="sm" weight={500}>
                      {proofName}
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
                    <RecordActions
                      onAccept={isWaitingForAccept ? () => onAccept(record) : undefined}
                      onDecline={isWaitingForDecline ? () => onDecline(record) : undefined}
                      onDelete={() => onDelete(record)}
                      isLoading={isLoading}
                    />
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
