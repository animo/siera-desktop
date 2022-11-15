import { UnstyledButton } from '@mantine/core'
import { IconChevronLeft } from '@tabler/icons'
import React from 'react'
import { useNavigate } from 'react-router-dom'

export const BackButton = () => {
  const navigate = useNavigate()

  return (
    <UnstyledButton onClick={() => navigate(-1)}>
      <IconChevronLeft size={32} />
    </UnstyledButton>
  )
}
