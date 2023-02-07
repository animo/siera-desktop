import { Accordion, Title } from '@mantine/core'
import React from 'react'

interface InformationCollapseProps {
  title: string
  children: React.ReactNode
}

export const InformationCollapse = ({ children, title }: InformationCollapseProps) => {
  return (
    <Accordion variant="contained">
      <Accordion.Item value="collapse">
        <Accordion.Control>
          <Title size="h5">{title}</Title>
        </Accordion.Control>
        <Accordion.Panel>{children}</Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
