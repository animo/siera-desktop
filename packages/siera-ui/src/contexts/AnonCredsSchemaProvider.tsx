import type { Agent } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { AnonCredsSchemaRecord } from '@aries-framework/core/build/modules/indy/repository/AnonCredsSchemaRecord'
import { AnonCredsSchemaRepository } from '@aries-framework/core/build/modules/indy/repository/AnonCredsSchemaRepository'
import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
} from '@aries-framework/react-hooks/build/recordUtils'
import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

export type AnonCredsSchema = AnonCredsSchemaRecord['schema']

type AnonCredsSchemaState = {
  schemas: Array<AnonCredsSchema>
  loading: boolean
}

const addRecord = (record: AnonCredsSchema, state: AnonCredsSchemaState): AnonCredsSchemaState => {
  const newRecordsState = [...state.schemas]
  newRecordsState.unshift(record)
  return {
    loading: state.loading,
    schemas: newRecordsState,
  }
}

const updateRecord = (record: AnonCredsSchema, state: AnonCredsSchemaState): AnonCredsSchemaState => {
  const newRecordsState = [...state.schemas]
  const index = newRecordsState.findIndex((r) => r.id === record.id)
  if (index > -1) {
    newRecordsState[index] = record
  }
  return {
    loading: state.loading,
    schemas: newRecordsState,
  }
}

const removeRecord = (record: AnonCredsSchema, state: AnonCredsSchemaState): AnonCredsSchemaState => {
  const newRecordsState = state.schemas.filter((r) => r.id !== record.id)
  return {
    loading: state.loading,
    schemas: newRecordsState,
  }
}

const AnonCredsSchemaContext = createContext<AnonCredsSchemaState | undefined>(undefined)

export const useAnonCredsSchemas = () => {
  const anonCredsSchemaContext = useContext(AnonCredsSchemaContext)
  if (!anonCredsSchemaContext) {
    throw new Error('useAnonCredsSchema must be used within a AnonCredsSchemaContextProvider')
  }
  return anonCredsSchemaContext
}

export const useAnonCredsSchemaById = (id: string): AnonCredsSchema | undefined => {
  const { schemas } = useAnonCredsSchemas()
  return schemas.find((c) => c.id === id)
}

interface Props {
  agent?: Agent
}

const AnonCredsSchemaProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<{
    schemas: Array<AnonCredsSchema>
    loading: boolean
  }>({
    schemas: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const schemaRepository = agent.dependencyManager.resolve(AnonCredsSchemaRepository)
      const records = await schemaRepository.getAll(agent.context)
      const schemas: Array<AnonCredsSchema> = records.map((r) => r.schema)
      setState({ schemas, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading && agent) {
      const credentialAdded$ = recordsAddedByType(agent, AnonCredsSchemaRecord).subscribe(async (record) => {
        setState(addRecord(record.schema, state))
      })

      const credentialUpdate$ = recordsUpdatedByType(agent, AnonCredsSchemaRecord).subscribe(async (record) => {
        setState(updateRecord(record.schema, state))
      })

      const credentialRemove$ = recordsRemovedByType(agent, AnonCredsSchemaRecord).subscribe((record) =>
        setState(removeRecord(record.schema, state))
      )

      return () => {
        credentialAdded$.unsubscribe()
        credentialUpdate$.unsubscribe()
        credentialRemove$.unsubscribe()
      }
    }
  }, [state, agent])

  return <AnonCredsSchemaContext.Provider value={state}>{children}</AnonCredsSchemaContext.Provider>
}

export default AnonCredsSchemaProvider
