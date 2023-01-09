import { Group } from '@mantine/core'
import React from 'react'

import { ColorSchemeSwitch } from './actions/ColorSchemeSwitch'
import { LogoutAction } from './actions/LogoutAction'

export const LayoutActions = () => {
  return (
    <Group position="apart">
      <LogoutAction />
      <ColorSchemeSwitch />
    </Group>
  )
}
