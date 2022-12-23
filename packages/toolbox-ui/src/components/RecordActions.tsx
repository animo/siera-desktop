import { ActionIcon, Group, Loader } from '@mantine/core'
import { IconTrash } from '@tabler/icons'
import React from 'react'

import { DangerButton, PrimaryButton } from './generic'

interface RecordActionsProps {
  onDelete?: () => void
  onDecline?: () => void
  onAccept?: () => void
  isLoading?: boolean
}

export const RecordActions = ({ onAccept, onDecline, onDelete, isLoading }: RecordActionsProps) => {
  const actions = [
    onAccept && (
      <PrimaryButton key="accept" size="xs" variant="light" onClick={onAccept}>
        Accept
      </PrimaryButton>
    ),

    onDecline && (
      <DangerButton key="reject" size="xs" variant="light" onClick={onDecline}>
        Decline
      </DangerButton>
    ),

    onDelete && (
      <ActionIcon key="delete" color="red" onClick={onDelete}>
        <IconTrash size={16} stroke={1.5} />
      </ActionIcon>
    ),
  ].filter(Boolean)

  return (
    <Group spacing={0} position="right">
      {isLoading ? <Loader size={20} /> : actions}
    </Group>
  )
}
