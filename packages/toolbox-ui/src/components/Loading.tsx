import { useTheme } from '@emotion/react'
import { Center, createStyles, Flex, Loader, Text, useMantineTheme } from '@mantine/core'
import React from 'react'

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
  const { colors } = useMantineTheme()

  return (
    <Center className={classes.spinnerCentering}>
      <Flex direction="column" align="center" gap="sm">
        <Loader size="xl" stroke={colors.primaryOne[0]} />
        {description && <Text align="center">{description}</Text>}
      </Flex>
    </Center>
  )
}
