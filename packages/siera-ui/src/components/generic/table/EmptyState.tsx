import { Flex, Text } from '@mantine/core'
import React from 'react'

import { Card } from '../../Card'

interface EmptyStateProps {
  title?: string
  message: string
  withCard?: boolean
}

export const EmptyState = ({ title, message, withCard }: EmptyStateProps) => {
  const emptyContent = (
    <Flex direction="column" align="center" my={80}>
      {title && <Text weight={600}>{title}</Text>}
      <Text color="dimmed">{message}</Text>
    </Flex>
  )

  if (!withCard) {
    return emptyContent
  }

  return <Card>{emptyContent}</Card>
}
