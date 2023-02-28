import type { ContextModalProps } from '@mantine/modals'

import { Divider, Group, Stack, Text } from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import React from 'react'

import { PrimaryButton, SecondaryButton } from '../components/generic'

type InnerProps = {
  message: string
  onConfirm: () => void
}

export const ConfirmActionModal = ({
  id,
  context,
  innerProps: { message, onConfirm },
}: ContextModalProps<InnerProps>) => {
  return (
    <Stack mt="md">
      <Text px="xl">{message}</Text>
      <Divider mt="md" mb="xs" />
      <Group position="right" px="xl">
        <SecondaryButton onClick={() => context.closeModal(id)}>Cancel</SecondaryButton>
        <PrimaryButton
          onClick={() => {
            onConfirm()
            context.closeModal(id)
          }}
        >
          Confirm
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

export const openConfirmActionModal = (title: string, message: string, onConfirm: () => void) => {
  openContextModal({
    modal: ConfirmActionModal.name,
    title,
    innerProps: { message, onConfirm },
    centered: true,
    withCloseButton: false,
  })
}
