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
    maxWidth: '100%',
    overflow: 'auto',
  },
  line: {
    padding: 0,
  },
}))

interface AttributeValueProps {
  value: unknown
}
export const AttributeValue = ({ value }: AttributeValueProps) => {
  const { classes } = useStyles()

  if (value == null) {
    return (
      <Prism
        language="javascript"
        copyLabel="Copy value"
        classNames={{ root: classes.root, code: classes.code, line: classes.line }}
      >
        {value == undefined ? 'undefined' : 'null'}
      </Prism>
    )
  }

  return (
    <Prism
      language="json"
      copyLabel="Copy value"
      classNames={{ root: classes.root, code: classes.code, line: classes.line }}
    >
      {JSON.stringify(value, null, 2)}
    </Prism>
  )
}
