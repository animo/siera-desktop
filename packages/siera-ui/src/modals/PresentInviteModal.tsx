import type { ContextModalProps } from '@mantine/modals'

import { Box, Center, createStyles, Divider, Text } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { showNotification } from '@mantine/notifications'
import { IconCopy } from '@tabler/icons'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import { PrimaryButton } from '../components/generic'

const useStyles = createStyles((theme) => ({
  qrCode: {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colors.primaryOne[7],
    padding: theme.spacing.xs,
  },
}))

export const PresentInviteModal = ({ innerProps }: ContextModalProps<{ inviteUrl: string }>) => {
  const clipBoard = useClipboard()
  const { classes } = useStyles()
  const { inviteUrl } = innerProps

  const copyToClipboard = async () => {
    clipBoard.copy(inviteUrl)

    showNotification({
      title: 'Invitation copied to clipboard',
      message: 'You can now use it how you like',
    })
  }

  return (
    <>
      <Center>
        <Box className={classes.qrCode}>
          <Box h={250} w={250}>
            <QRCodeSVG value={inviteUrl} size={250} />
          </Box>
        </Box>
      </Center>
      <Text mt="xs" align="center">
        Scan the QR-code with your wallet.
      </Text>
      <Divider label="OR" labelPosition="center" mb="lg" mt="md" />
      <PrimaryButton fullWidth onClick={copyToClipboard}>
        <IconCopy size={16} /> Copy url
      </PrimaryButton>
    </>
  )
}
