import { UnstyledButton } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons'
import React from 'react'

import { useNavigation } from '../hooks/useNavigation'

export const BackButton = () => {
  const navigation = useNavigation()

  return (
    <UnstyledButton onClick={() => navigation.goBack()}>
      <IconChevronLeft size={32} />
    </UnstyledButton>
  )
}
