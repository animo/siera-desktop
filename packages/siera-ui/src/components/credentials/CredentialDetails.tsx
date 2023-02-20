import type { FormattedCredentialData } from '../../contexts/CredentialFormatDataProvider'

import { formatSchemaName } from '@animo/siera-core'
import { createStyles, Group, SimpleGrid, Title } from '@mantine/core'
import React from 'react'

import { Card } from '../Card'
import { AttributeValue } from '../generic/information/AttributeValue'
import { RecordCodeBlock } from '../generic/information/RecordCodeBlock'

interface CredentialDetailsParams {
  credentialFormatted: FormattedCredentialData
}

const useStyles = createStyles(() => ({
  attributeName: {
    whiteSpace: 'nowrap',
  },
}))

export const CredentialDetails = ({ credentialFormatted }: CredentialDetailsParams) => {
  const { classes } = useStyles()
  if (credentialFormatted.offerAttributes == null) {
    return <div>There are no attributes</div>
  }

  const credentialName = formatSchemaName(credentialFormatted.credential?.indy?.schema_id)

  return (
    <Card title={credentialName} titleSize="h2" withPadding>
      <SimpleGrid cols={2} mt="md" mb="xl">
        {credentialFormatted.offerAttributes.map(({ name, value }) => (
          <Group key={name} noWrap>
            <Title size="h6" className={classes.attributeName} w={120}>
              {name}
            </Title>
            <AttributeValue value={value} />
          </Group>
        ))}
      </SimpleGrid>

      <Title size="h3" mb="xs">
        Record
      </Title>
      <RecordCodeBlock record={credentialFormatted} />
    </Card>
  )
}
