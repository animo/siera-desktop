import { ActionIcon, createStyles, useMantineColorScheme } from '@mantine/core'
import { IconMoonStars, IconSun } from '@tabler/icons'
import React from 'react'

const useStyles = createStyles((theme) => ({
  icon: {
    backgroundColor: theme.colors.primaryOne[7],
    color: theme.colors.textTwo[7],

    '&:hover': {
      backgroundColor: theme.colors.primaryOne[6],
    },
  },
}))

export const ColorSchemeSwitch = () => {
  const { classes } = useStyles()
  const { colorScheme, toggleColorScheme } = useMantineColorScheme()

  return (
    <ActionIcon onClick={() => toggleColorScheme()} size="lg" className={classes.icon}>
      {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
    </ActionIcon>
  )
}
