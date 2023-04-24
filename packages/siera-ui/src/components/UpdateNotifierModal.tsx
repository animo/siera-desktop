import { Divider, Group, Modal, Stack, Text } from '@mantine/core'
import React from 'react'

import { useRuntimeInformation } from '../contexts/RuntimeInformationContext'
import { useUpdateInformation } from '../contexts/UpdateInformation'

import { PrimaryButton, SecondaryButton } from './generic'

export const UpdateNotifierModal = () => {
  const { version } = useRuntimeInformation()
  const { available, information, setIgnored, ignored } = useUpdateInformation()

  const openUpdateUrl = () => {
    if (!information) return
    window.open(information.url, '_blank')
  }

  return (
    <Modal
      centered
      opened={available && !ignored}
      onClose={() => setIgnored(true)}
      title="New update available"
      withCloseButton={false}
      closeOnClickOutside={false}
    >
      <Stack>
        <Text px="xl" pt="sm">
          You are currently running version <b>v{version}</b>. The latest version is <b>{information?.version}</b>.
        </Text>
        <Divider mt="xs" />
        <Group position="right" px="xl">
          <SecondaryButton onClick={() => setIgnored(true)}>Ignore</SecondaryButton>
          <PrimaryButton onClick={openUpdateUrl}>Update</PrimaryButton>
        </Group>
      </Stack>
    </Modal>
  )
}
