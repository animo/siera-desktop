import { createStyles } from '@mantine/core'
import React from 'react'

interface TableColumn {
  label: string
  size?: number
  blank?: boolean
}

interface TableHeadProps {
  columns: TableColumn[]
}

const useStyles = createStyles((theme) => ({
  tableHeader: {
    backgroundColor: theme.colors.backgroundOne[7],
    borderTop: `2px solid ${theme.colors.backgroundOne[6]}`,
    borderBottom: `2px solid ${theme.colors.backgroundOne[6]}`,
  },
}))

export const TableHead = ({ columns }: TableHeadProps) => {
  const { classes } = useStyles()

  return (
    <thead className={classes.tableHeader}>
      <tr>
        {columns.map((column) => (
          <th key={column.label} style={{ width: column.size }}>
            {!column.blank && column.label}
          </th>
        ))}
      </tr>
    </thead>
  )
}
