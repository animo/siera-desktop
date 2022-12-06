import { ActionIcon, Group, Loader } from '@mantine/core'
import { IconCheck, IconTrash, IconX } from '@tabler/icons'
import React from 'react'

interface RecordActionsProps {
  onDelete?: () => void
  onDecline?: () => void
  onAccept?: () => void

  isDeclineable?: boolean
  isAcceptable?: boolean
  isLoading?: boolean
}

export const RecordActions = ({
  isAcceptable,
  onAccept,
  onDecline,
  isDeclineable,
  onDelete,
  isLoading,
}: RecordActionsProps) => {
  const actions = [
    isAcceptable ? (
      <ActionIcon key="accept" color="green">
        <IconCheck size={16} stroke={1.5} onClick={onAccept} />
      </ActionIcon>
    ) : null,

    isDeclineable ? (
      <ActionIcon key="reject" color="red" onClick={onDecline}>
        <IconX size={16} stroke={1.5} />
      </ActionIcon>
    ) : null,

    <ActionIcon key="delete" color="red" onClick={onDelete}>
      <IconTrash size={16} stroke={1.5} />
    </ActionIcon>,
  ]

  return (
    <Group spacing={0} position="right">
      {isLoading ? <Loader size={20} /> : <>{actions}</>}
    </Group>
  )
}
