import type { ButtonProps } from '@mantine/core'

import { Button } from '@mantine/core'
import React from 'react'

interface ClickAble {
  onClick?: () => void
}

export const PrimaryButton = (props: ButtonProps & ClickAble) => {
  return <Button color="primary" variant="light" {...props} />
}

export const SecondaryButton = (props: ButtonProps) => {
  return <Button color="secondary" variant="light" {...props} />
}

export const DangerButton = (props: ButtonProps & ClickAble) => {
  return <Button color="red" variant="subtle" {...props} />
}
