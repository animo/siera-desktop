import { createStyles } from '@mantine/core'
import { Prism } from '@mantine/prism'
import React from 'react'

const useStyles = createStyles((theme) => ({
  code: {
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.backgroundOne[6]}`,
    padding: theme.spacing.xs,
  },
  root: {
    width: '100%',
  },
  line: {
    padding: 0,
  },
}))

interface RecordCodeBlockProps {
  record: unknown
}

export const RecordCodeBlock = ({ record }: RecordCodeBlockProps) => {
  const { classes } = useStyles()
  return (
    <Prism language="json" withLineNumbers classNames={{ root: classes.root, code: classes.code, line: classes.line }}>
      {JSON.stringify(record, null, 2)}
    </Prism>
  )
}
