import { Center, createStyles, Flex, Loader, Text, useMantineColorScheme } from '@mantine/core'
import React from 'react'

const useStyles = createStyles({
  spinnerCentering: {
    height: '100vh',
  },
})

interface LoadingProps {
  description?: string
}

export const Loading = ({ description }: LoadingProps) => {
  const { classes } = useStyles()
  const { colorScheme } = useMantineColorScheme()

  return (
    <Center className={classes.spinnerCentering}>
      <Flex direction="column" align="center" gap="sm">
        <Loader size="xl" color={colorScheme == 'dark' ? 'white' : 'black'} />
        {description && (
          <Text align="center" c="dimmed">
            {description}
          </Text>
        )}
      </Flex>
    </Center>
  )
}
