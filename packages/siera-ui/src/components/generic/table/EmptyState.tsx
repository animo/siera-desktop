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
      {title && (
        <Text size="sm" weight={500}>
          {title}
        </Text>
      )}
      <Text size="sm" color="dimmed">
        {message}
      </Text>
    </Flex>
  )

  if (!withCard) {
    return emptyContent
  }

  return <Card>{emptyContent}</Card>
}
