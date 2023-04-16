import { AnonCredsSchemaRepository } from '@aries-framework/core/build/modules/indy/repository/AnonCredsSchemaRepository'
import { useAgent } from '@aries-framework/react-hooks'
import { useEffect, useState } from 'react'

// The schema type is not exported from AFJ. Will be fixed once we update to 0.4.0
type Schema = Awaited<ReturnType<NonNullable<ReturnType<typeof useAgent>['agent']>['ledger']['registerSchema']>>

export const useSchemas = (): { schemas: Schema[]; loading: boolean } => {
  const { agent } = useAgent()
  const [schemas, setSchemas] = useState<Schema[]>([])
  const [loading, setLoading] = useState(false)

  const schemaRepository = agent?.dependencyManager.resolve(AnonCredsSchemaRepository)

  useEffect(() => {
    if (!agent) return

    setLoading(true)
    schemaRepository
      ?.getAll(agent?.context)
      .then((schemaRecords) => {
        setSchemas(schemaRecords.map((schemaRecord) => schemaRecord.schema))
      })
      .finally(() => setLoading(false))
  }, [agent])

  return { schemas, loading }
}
