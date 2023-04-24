import { Space } from '@mantine/core'
import React from 'react'
import { useParams } from 'react-router-dom'

import { SmallBackButton } from '../../../components/generic'
import { AnonCredsSchemaDetails } from '../../../components/schemas/AnonCredsSchemaDetails'
import { useAnonCredsSchemaById } from '../../../contexts/AnonCredsSchemaProvider'

const SchemaNotFound = () => {
  return (
    <>
      <SmallBackButton />
      <div>Schema not found</div>
    </>
  )
}

export const AnonCredsSchemasDetailsScreen = () => {
  const { schemaId } = useParams()
  if (!schemaId) {
    return <SchemaNotFound />
  }

  const schema = useAnonCredsSchemaById(schemaId)
  if (!schema) {
    return <SchemaNotFound />
  }

  return (
    <>
      <Space h="md" />
      <SmallBackButton>AnonCreds</SmallBackButton>
      <Space h="md" />
      <AnonCredsSchemaDetails schema={schema} />
    </>
  )
}
