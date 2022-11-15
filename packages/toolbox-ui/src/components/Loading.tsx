import { Center, createStyles, Flex, Loader, Text } from '@mantine/core'
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

  return (
    <>
      <Center className={classes.spinnerCentering}>
        <Flex direction={'column'} align={'center'} gap={'sm'}>
          <Loader size={'xl'} />
          {description ? (
            <Text align={'center'} c={'dimmed'}>
              {description}
            </Text>
          ) : null}
        </Flex>
      </Center>
    </>
  )
}
