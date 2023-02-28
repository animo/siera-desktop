import type { ContextModalProps } from '@mantine/modals'

import {
  ActionIcon,
  Box,
  Center,
  CopyButton,
  createStyles,
  Divider,
  Group,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core'
import { openContextModal } from '@mantine/modals'
import { IconCheck, IconCopy } from '@tabler/icons'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import { SecondaryButton } from '../components/generic'

const useStyles = createStyles((theme) => ({
  qrCode: {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.backgroundOne[6],
    padding: theme.spacing.xs,
    boxShadow: theme.shadows.sm,
  },
  urlInput: {
    backgroundColor: theme.colors.backgroundOne[7],
  },
}))

export const PresentInviteModal = ({ innerProps, context, id }: ContextModalProps<{ inviteUrl: string }>) => {
  const { classes } = useStyles()
  const { inviteUrl } = innerProps

  const copyUrl = (
    <CopyButton value={inviteUrl} timeout={2000}>
      {({ copied, copy }) => (
        <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
          <ActionIcon onClick={copy}>{copied ? <IconCheck size={16} /> : <IconCopy size={16} />}</ActionIcon>
        </Tooltip>
      )}
    </CopyButton>
  )

  return (
    <>
      <Box px="xl">
        <Text color="dimmed">Scan the QR code or compy the invitation url</Text>
        <Center mt="xl">
          <Box className={classes.qrCode}>
            <Box h={250} w={250}>
              <QRCodeSVG value={inviteUrl} size={250} />
            </Box>
          </Box>
        </Center>
        <TextInput mt={40} value={inviteUrl} readOnly classNames={{ input: classes.urlInput }} rightSection={copyUrl} />
      </Box>
      <Divider mt="xl" />
      <Group mt="md" position="center">
        <SecondaryButton onClick={() => context.closeModal(id)}>Done</SecondaryButton>
      </Group>
    </>
  )
}

export const openPresentInviteModal = (inviteUrl: string) => {
  openContextModal({
    modal: PresentInviteModal.name,
    title: 'Create connection',
    centered: true,
    withCloseButton: false,
    innerProps: {
      inviteUrl,
    },
  })
}
