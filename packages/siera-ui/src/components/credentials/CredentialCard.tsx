import { Card, createStyles, Flex, Space, Text, Title } from '@mantine/core'
import React from 'react'

import { SmartAvatar } from '../SmartAvatar'

export interface CredentialDetails {
  credentialId: string
  credentialName: string
  credentialAttributes: [string, string][]
}

const useStyles = createStyles((theme) => ({
  tag: {
    color: theme.colors.textOne[7],
    backgroundColor: theme.colors.backgroundOne[5],
    padding: `0 ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.sm,
  },
  value: {
    color: theme.colors.textOne[7],
    backgroundColor: theme.colors.backgroundOne[6],
    padding: `0 ${theme.spacing.xs}px`,
    borderRadius: theme.radius.sm,
    fontSize: theme.fontSizes.sm,
  },
}))

export const CredentialCard = ({ credentialDetails }: { credentialDetails: CredentialDetails }) => {
  const { classes } = useStyles()

  return (
    <Card>
      <Flex direction="row" gap="sm">
        <SmartAvatar size={30} radius={30} />
        <Title order={4}>{credentialDetails.credentialName}</Title>
      </Flex>
      <Space h="md" />
      <Flex direction="column" gap="sm">
        {credentialDetails.credentialAttributes.map(([key, value]) => (
          <Flex key={key} direction="row" gap="sm">
            <Text className={classes.tag}>{key}</Text>
            <Text className={classes.value}>{value}</Text>
          </Flex>
        ))}
      </Flex>
    </Card>
  )
}
