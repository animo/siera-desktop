import { Loader, useMantineTheme } from '@mantine/core'
import React from 'react'

export const LoadingSpinner = () => {
  const { colors, colorScheme } = useMantineTheme()

  // The styling is a bit weird for the loader component
  const strokeColor = colorScheme == 'dark' ? colors.primaryTwo[0] : undefined

  return <Loader size="md" stroke={strokeColor} />
}
