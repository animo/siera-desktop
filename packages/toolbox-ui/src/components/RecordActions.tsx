import { ActionIcon, createStyles, Group, Loader } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import React from 'react'

import { PrimaryButton, SecondaryButton } from './generic'

interface RecordActionsProps {
  onDelete?: () => void
  onDecline?: () => void
  onAccept?: () => void
  isLoading?: boolean
}

const useStyles = createStyles((theme) => ({
  trashIcon: {
    color: theme.colors.danger[6],
  },
}))

export const RecordActions = ({ onAccept, onDecline, onDelete, isLoading }: RecordActionsProps) => {
  const { classes } = useStyles()

  const actions = [
    onAccept && (
      <PrimaryButton key="accept" size="xs" variant="light" onClick={onAccept}>
        Accept
      </PrimaryButton>
    ),

    onDecline && (
      <SecondaryButton key="reject" size="xs" onClick={onDecline}>
        Decline
      </SecondaryButton>
    ),

    onDelete && (
      <ActionIcon key="delete" onClick={onDelete} variant="transparent">
        <IconTrash size={16} stroke={1.5} className={classes.trashIcon} />
      </ActionIcon>
    ),
  ].filter(Boolean)

  return (
    <Group spacing={4} position="right">
      {isLoading ? <Loader size={20} /> : actions}
    </Group>
  )
}
