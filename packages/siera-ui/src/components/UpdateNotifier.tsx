import { Group, Modal, Space, Text } from '@mantine/core'
import React from 'react'

import { useRuntimeInformation } from '../contexts/RuntimeInformationContext'
import { useUpdateInformation } from '../contexts/UpdateInformation'

import { PrimaryButton, SecondaryButton } from './generic'

export const UpdateNotifier = () => {
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
      title="There is a new update available"
      withCloseButton={false}
      closeOnClickOutside={false}
    >
      <Text>
        You are currently running version <b>v{version}</b>. The latest version is <b>{information?.version}</b>.
      </Text>
      <Space h="xl" />
      <Group position="right">
        <SecondaryButton onClick={() => setIgnored(true)}>Ignore</SecondaryButton>
        <PrimaryButton onClick={openUpdateUrl}>Update</PrimaryButton>
      </Group>
    </Modal>
  )
}
