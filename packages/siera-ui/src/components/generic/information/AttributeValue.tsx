import { createStyles } from '@mantine/core'
import { Prism } from '@mantine/prism'
import React, { useState } from 'react'

const useStyles = createStyles((theme) => ({
  code: {
    borderRadius: theme.radius.md,
    border: `1px solid ${theme.colors.backgroundOne[6]}`,
    padding: `${theme.spacing.sm}px ${theme.spacing.xs}px`,
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
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} className={classes.root}>
      {value == null ? (
        <Prism
          language="javascript"
          copyLabel="Copy value"
          noCopy={!isHovered}
          classNames={{ root: classes.root, code: classes.code, line: classes.line }}
        >
          {value == undefined ? 'undefined' : 'null'}
        </Prism>
      ) : (
        <Prism
          language="json"
          copyLabel="Copy value"
          noCopy={!isHovered}
          classNames={{ root: classes.root, code: classes.code, line: classes.line }}
        >
          {JSON.stringify(value, null, 2)}
        </Prism>
      )}
    </div>
  )
}
