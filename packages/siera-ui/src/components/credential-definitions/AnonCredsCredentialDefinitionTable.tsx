import type { AnonCredsCredentialDefinition } from '../../contexts/AnonCredsCredentialDefinitionProvider'

import { createStyles, ScrollArea, Table, Text } from '@mantine/core'
import React from 'react'

import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { useGenericTableStyle } from '../generic/table/GenericTableStyle'
import { TableHead } from '../generic/table/TableHeader'

interface AnonCredsCredentialDefinitionTableProps {
  records: AnonCredsCredentialDefinition[]
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 400,
    tableLayout: 'fixed',
  },
}))

export const AnonCredsCredentialDefinitionTable = ({ records }: AnonCredsCredentialDefinitionTableProps) => {
  const { classes: tableStyle, cx } = useGenericTableStyle()
  const { classes } = useStyles()
  const navigation = useNavigation()

  const selectRow = (credentialDefinition: AnonCredsCredentialDefinition) => {
    navigation.navigate(`/agent/anoncreds/credential-definitions/{credentialDefinitionId}`, {
      credentialDefinitionId: encodeURIComponent(credentialDefinition.id),
    })
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <TableHead
          columns={[
            { label: 'Tag', size: 200 },
            { label: 'Schema ID', size: 100 },
            { label: 'Network', size: 200 },
          ]}
        />
        <tbody>
          {records.map((record) => {
            const select = () => selectRow(record)

            return (
              <tr key={record.id} className={cx(tableStyle.clickableRow, tableStyle.row)} onClick={select}>
                <td>
                  <Text size="sm" weight={500}>
                    {record.tag}
                  </Text>
                </td>
                <td>
                  <Text size="sm" weight={500}>
                    {record.schemaId}
                  </Text>
                </td>
                <td>
                  {/* We can extract this once we update to 0.4.0. */}
                  <Text size="sm" weight={500}>
                    Indy (BCovrin Test)
                  </Text>
                </td>

                <td>
                  <RecordActions />
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </ScrollArea>
  )
}
