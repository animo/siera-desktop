import type { ContextModalProps } from '@mantine/modals'

import { Divider, Group, Stack, Text } from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import React, { useState } from 'react'

import { PrimaryButton, SecondaryButton } from '../components/generic'

type InnerProps = {
  description: string
  onConfirm: () => Promise<void> | void
  confirmLabel?: string
}

export const ConfirmActionModal = ({
  id,
  context,
  innerProps: { description, onConfirm, confirmLabel },
}: ContextModalProps<InnerProps>) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const onConfirmClick = async () => {
    setIsSubmitting(true)
    try {
      await onConfirm()
      setIsSubmitting(false)
      context.closeModal(id)
    } catch (error) {
      setIsSubmitting(false)
      throw error
    }
  }

  return (
    <Stack mt="md">
      <Text px="xl">{description}</Text>
      <Divider mt="md" mb="xs" />
      <Group position="right" px="xl">
        <SecondaryButton onClick={() => context.closeModal(id)}>Cancel</SecondaryButton>
        <PrimaryButton onClick={onConfirmClick} loading={isSubmitting}>
          {confirmLabel}
        </PrimaryButton>
      </Group>
    </Stack>
  )
}

interface OpenConfirmActionModalProps extends InnerProps {
  title: string
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
