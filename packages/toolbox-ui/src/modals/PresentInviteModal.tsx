import type { ContextModalProps } from '@mantine/modals'

import { Box, Center, createStyles, Divider, Text } from '@mantine/core'
import { showNotification } from '@mantine/notifications'
import { QRCodeSVG } from 'qrcode.react'
import React from 'react'

import { PrimaryButton } from '../components/generic'

const useStyles = createStyles((theme) => ({
  qrCode: {
    borderRadius: theme.radius.sm,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.gray[0] : theme.white,
    padding: theme.spacing.xs,
  },
}))

export const PresentInviteModal = ({ innerProps }: ContextModalProps<{ inviteUrl: string }>) => {
  const { classes } = useStyles()
  const { inviteUrl } = innerProps

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(inviteUrl)

    showNotification({
      title: 'Invitation copied to clipboard',
      message: 'You can now use how you like',
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
        Scan this QR code with your mobile device.
      </Text>
      <Divider label="OR" labelPosition="center" mb="xs" />
      <PrimaryButton fullWidth onClick={copyToClipboard}>
        Copy url
      </PrimaryButton>
    </>
  )
}
