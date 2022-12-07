import { ActionIcon, Group, Loader } from '@mantine/core'
import { IconCheck, IconTrash, IconX } from '@tabler/icons'
import React from 'react'

interface RecordActionsProps {
  onDelete?: () => void
  onDecline?: () => void
  onAccept?: () => void
  isLoading?: boolean
}

export const RecordActions = ({ onAccept, onDecline, onDelete, isLoading }: RecordActionsProps) => {
  const actions = [
    onAccept && (
      <ActionIcon key="accept" color="green" onClick={onAccept}>
        <IconCheck size={16} stroke={1.5} />
      </ActionIcon>
    ),

    onDecline && (
      <ActionIcon key="reject" color="red" onClick={onDecline}>
        <IconX size={16} stroke={1.5} />
      </ActionIcon>
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
