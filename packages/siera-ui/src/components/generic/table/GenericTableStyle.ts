import { createStyles } from '@mantine/core'

export const useGenericTableStyle = createStyles((theme) => ({
  clickableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: theme.fn.rgba(theme.colors.backgroundOne[0], 0.05),
    },
  },
  row: {
    '& td:first-child': {
      paddingLeft: theme.spacing.md,
    },
  },
}))
