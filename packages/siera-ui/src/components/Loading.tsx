import { Center, createStyles, Flex, Text } from '@mantine/core'
import React from 'react'

import { LoadingSpinner } from './LoadingSpinner'

const useStyles = createStyles((theme) => ({
  spinnerCentering: {
    height: '100vh',
  },
  descriptionText: {
    color: theme.colors.textOne[0],
  },
}))

interface LoadingProps {
  description?: string
}

export const Loading = ({ description }: LoadingProps) => {
  const { classes } = useStyles()

  return (
    <Center className={classes.spinnerCentering}>
      <Flex direction="column" align="center" gap="sm">
        <LoadingSpinner />
        {description && (
          <Text size="sm" align="center">
            {description}
          </Text>
        )}
      </Flex>
    </Center>
  )
}
