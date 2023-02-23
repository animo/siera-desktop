import { Box, createStyles, Flex, Text } from '@mantine/core'
import { IconDatabaseOff } from '@tabler/icons'
import React from 'react'

interface EmptyStateProps {
  message: string
}

const useStyles = createStyles((theme) => ({
  icon: {
    backgroundColor: theme.fn.rgba(theme.colors.grayscaleOne[7], 0.1),
    padding: theme.spacing.xs,
    borderRadius: theme.radius.xl,
    height: 48,
    width: 48,
    marginBottom: theme.spacing.xs,
  },
}))

export const EmptyState = ({ message }: EmptyStateProps) => {
  const { classes } = useStyles()

  return (
    <Flex direction="column" align="center" mt="xl" mb="xl">
      <Box className={classes.icon}>
        <Flex align="center" justify="center" h="100%" w="100%">
          <IconDatabaseOff size={32} stroke={1} />
        </Flex>
      </Box>
      <Text>{message}</Text>
    </Flex>
  )
}
