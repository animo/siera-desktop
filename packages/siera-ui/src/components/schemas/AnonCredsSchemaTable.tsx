import type { AnonCredsSchema } from '../../contexts/AnonCredsSchemaProvider'

import { createStyles, ScrollArea, Table, Text } from '@mantine/core'
import React from 'react'

import { useNavigation } from '../../hooks/useNavigation'
import { RecordActions } from '../RecordActions'
import { useGenericTableStyle } from '../generic/table/GenericTableStyle'
import { TableHead } from '../generic/table/TableHeader'

interface AnonCredsSchemaTableProps {
  records: AnonCredsSchema[]
}

const useStyles = createStyles(() => ({
  table: {
    width: '100%',
    minWidth: 400,
    tableLayout: 'fixed',
  },
}))

export const AnonCredsSchemaTable = ({ records }: AnonCredsSchemaTableProps) => {
  const { classes: tableStyle, cx } = useGenericTableStyle()
  const { classes } = useStyles()
  const navigation = useNavigation()

  const selectRow = (schema: AnonCredsSchema) => {
    navigation.navigate(`/agent/anoncreds/schemas/{schemaId}`, {
      schemaId: encodeURIComponent(schema.id),
    })
  }

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" className={classes.table}>
        <TableHead
          columns={[
            { label: 'Name', size: 200 },
            { label: 'Version', size: 100 },
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
                    {record.name}
                  </Text>
                </td>
                <td>
                  <Text size="sm" weight={500}>
                    {record.version}
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
