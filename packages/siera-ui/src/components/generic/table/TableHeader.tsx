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
    backgroundColor: theme.fn.rgba(theme.colors.backgroundOne[7], 0.75),
    borderTop: `1px solid ${theme.colors.backgroundOne[6]}`,
    borderBottom: `1px solid ${theme.colors.backgroundOne[6]}`,

    '& th:first-child': {
      paddingLeft: theme.spacing.md,
    },
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
