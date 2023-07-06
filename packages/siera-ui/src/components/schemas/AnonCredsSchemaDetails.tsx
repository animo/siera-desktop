import type { AnonCredsSchema } from '../../contexts/AnonCredsSchemaProvider'

import { capitalize } from '@animo/siera-core'
import { createStyles, Group, SimpleGrid, Title } from '@mantine/core'
import React from 'react'

import { Card } from '../Card'
import { AttributeValue } from '../generic/information/AttributeValue'
import { RecordCodeBlock } from '../generic/information/RecordCodeBlock'

interface AnonCredsSchemaDetailsParams {
  schema: AnonCredsSchema
}

const useStyles = createStyles(() => ({
  attributeName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export const AnonCredsSchemaDetails = ({ schema }: AnonCredsSchemaDetailsParams) => {
  const { classes } = useStyles()

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const { ver, ...schemaPropsToRender } = schema

  return (
    <Card withPadding>
      <Title size="h3">{schema.name}</Title>

      <SimpleGrid cols={2} mt="md" mb="xl">
        {Object.entries(schemaPropsToRender)
          .filter(([, value]) => typeof value !== 'object')
          .map(([name, value]) => (
            <Group key={name} noWrap>
              <Title size="h6" className={classes.attributeName} w={160}>
                {capitalize(name)}
              </Title>
              <AttributeValue value={value} />
            </Group>
          ))}
      </SimpleGrid>

      <Title size="h3" mb="xs">
        Schema
      </Title>
      <RecordCodeBlock record={schema} />
    </Card>
  )
}
