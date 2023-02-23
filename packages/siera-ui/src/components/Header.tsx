import { Group, Stack, Text, Title } from '@mantine/core'
import React from 'react'

interface HeaderProps {
  title: string
  description: string
  actions?: React.ReactNode
}

export const Header = ({ actions, description, title }: HeaderProps) => {
  return (
    <Group position="apart" mb="xl">
      <Stack spacing={0}>
        <Title size="h1" mb="xs">
          {title}
        </Title>
        <Text color="dimmed">{description}</Text>
      </Stack>
      {actions}
    </Group>
  )
}
