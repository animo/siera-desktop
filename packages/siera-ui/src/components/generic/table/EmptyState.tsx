import { Flex, Space, Text } from '@mantine/core'
import React from 'react'

import { Card } from '../../Card'

interface EmptyStateProps {
  title?: string
  message: string
  withCard?: boolean
  children?: React.ReactNode
}

export const EmptyState = ({ title, message, withCard, children }: EmptyStateProps) => {
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
      {children && (
        <>
          <Space h="md" />
          {children}
        </>
      )}
    </Flex>
  )

  if (!withCard) {
    return emptyContent
  }

  return <Card>{emptyContent}</Card>
}
