import { ActionIcon, createStyles, Group, Loader } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import React from 'react'

import { openConfirmActionModal } from '../modals'

import { PrimaryButton, SecondaryButton } from './generic'

interface RecordActionsProps {
  onDelete?: () => void
  onDecline?: () => void
  onAccept?: () => void
  isLoading?: boolean
  propagateEvent?: boolean
}

const useStyles = createStyles((theme) => ({
  trashIcon: {
    color: theme.colors.danger[6],
  },
}))

export const RecordActions = ({ onAccept, onDecline, onDelete, isLoading, propagateEvent }: RecordActionsProps) => {
  const { classes } = useStyles()

  const clickAction = (returnFn: () => void) => (event: React.MouseEvent<HTMLButtonElement>) => {
    !propagateEvent && event.stopPropagation()
    returnFn()
  }

  const dangerAction = (confirmMethod: () => void) => (event: React.MouseEvent<HTMLButtonElement>) => {
    !propagateEvent && event.stopPropagation()
    openConfirmActionModal({
      title: 'Delete record',
      description: 'Are you sure you want to delete this record?',
      confirmLabel: 'Delete',
      onConfirm: confirmMethod,
    })
  }

  const actions = [
    onAccept && (
      <PrimaryButton key="accept" size="xs" variant="light" onClick={clickAction(onAccept)}>
        Accept
      </PrimaryButton>
    ),

    onDecline && (
      <SecondaryButton key="reject" size="xs" onClick={clickAction(onDecline)}>
        Decline
      </SecondaryButton>
    ),

    onDelete && (
      <ActionIcon key="delete" onClick={dangerAction(onDelete)} variant="transparent">
        <IconTrash size={16} stroke={1.5} className={classes.trashIcon} />
      </ActionIcon>
    ),
  ].filter(Boolean)

  return (
    <Group spacing={4} position="right">
      {isLoading && <Loader size={20} />}
      {actions}
    </Group>
  )
}
