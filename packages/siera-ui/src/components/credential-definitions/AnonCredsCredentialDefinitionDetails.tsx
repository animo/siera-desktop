import type { AnonCredsCredentialDefinition } from '../../contexts/AnonCredsCredentialDefinitionProvider'

import { capitalize } from '@animo/siera-core'
import { createStyles, Group, SimpleGrid, Title } from '@mantine/core'
import React from 'react'

import { Card } from '../Card'
import { AttributeValue } from '../generic/information/AttributeValue'
import { RecordCodeBlock } from '../generic/information/RecordCodeBlock'

interface AnonCredsCredentialDefinitionDetailsParams {
  credentialDefinition: AnonCredsCredentialDefinition
}

const useStyles = createStyles(() => ({
  attributeName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export const AnonCredsCredentialDefinitionDetails = ({
  credentialDefinition,
}: AnonCredsCredentialDefinitionDetailsParams) => {
  const { classes } = useStyles()

  // eslint-disable-next-line unused-imports/no-unused-vars, @typescript-eslint/no-unused-vars
  const { ver, ...credentialDefinitionPropsToRender } = credentialDefinition

  return (
    <Card withPadding>
      <Title size="h3">{credentialDefinition.tag}</Title>

      <SimpleGrid cols={2} mt="md" mb="xl">
        {Object.entries(credentialDefinitionPropsToRender)
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
        Credential Definition
      </Title>
      <RecordCodeBlock record={credentialDefinition} />
    </Card>
  )
}
