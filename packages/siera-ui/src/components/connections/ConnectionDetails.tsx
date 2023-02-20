import type { ConnectionRecord } from '@aries-framework/core'

import { capitalize } from '@animo/siera-core'
import { createStyles, Group, SimpleGrid, Title } from '@mantine/core'
import React from 'react'

import { Card } from '../Card'
import { SmartAvatar } from '../SmartAvatar'
import { AttributeValue } from '../generic/information/AttributeValue'
import { RecordCodeBlock } from '../generic/information/RecordCodeBlock'

interface ConnectionDetailsParams {
  connectionRecord: ConnectionRecord
}

const useStyles = createStyles(() => ({
  attributeName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}))

export const ConnectionDetails = ({ connectionRecord }: ConnectionDetailsParams) => {
  const { classes } = useStyles()
  return (
    <Card withPadding>
      <Group spacing="xs" my="xs">
        <SmartAvatar src={connectionRecord.imageUrl} size={32} radius="xl">
          {connectionRecord.theirLabel}
        </SmartAvatar>
        <Title size="h3">{connectionRecord.theirLabel ?? 'No label'}</Title>
      </Group>

      <SimpleGrid cols={2} mt="md" mb="xl">
        {Object.entries(connectionRecord)
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
        Record
      </Title>
      <RecordCodeBlock record={connectionRecord} />
    </Card>
  )
}
