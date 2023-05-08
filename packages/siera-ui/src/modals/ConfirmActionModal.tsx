import type { ContextModalProps } from '@mantine/modals'

import { Divider, Group, Stack, Text } from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import React from 'react'

import { PrimaryButton, SecondaryButton } from '../components/generic'

type InnerProps = {
  description: string
  onConfirm: () => void
  confirmLabel?: string
}

export const ConfirmActionModal = ({
  id,
  context,
  innerProps: { description, onConfirm, confirmLabel },
}: ContextModalProps<InnerProps>) => {
  return (
    <Stack mt="md">
      <Text px="xl">{description}</Text>
      <Divider mt="md" mb="xs" />
      <Group position="right" px="xl">
        <SecondaryButton onClick={() => context.closeModal(id)}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={() => {
            onConfirm()
            context.closeModal(id)
          }}
        >
          {confirmLabel}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

interface OpenConfirmActionModalProps {
  title: string
  description: string
  onConfirm: () => void
  confirmLabel?: string
}

export const openConfirmActionModal = ({
  title,
  description,
  onConfirm,
  confirmLabel = 'Confirm',
}: OpenConfirmActionModalProps) => {
  openContextModal({
    modal: ConfirmActionModal.name,
    title,
    innerProps: { description: description, onConfirm, confirmLabel },
    centered: true,
    withCloseButton: false,
  })
}
