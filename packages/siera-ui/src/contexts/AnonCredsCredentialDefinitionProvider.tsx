import type { Agent } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { AnonCredsCredentialDefinitionRecord } from '@aries-framework/core/build/modules/indy/repository/AnonCredsCredentialDefinitionRecord'
import { AnonCredsCredentialDefinitionRepository } from '@aries-framework/core/build/modules/indy/repository/AnonCredsCredentialDefinitionRepository'
import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
} from '@aries-framework/react-hooks/build/recordUtils'
import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

export type AnonCredsCredentialDefinition = AnonCredsCredentialDefinitionRecord['credentialDefinition']

type AnonCredsCredentialDefinitionState = {
  credentialDefinitions: Array<AnonCredsCredentialDefinition>
  loading: boolean
}

const addRecord = (
  record: AnonCredsCredentialDefinition,
  state: AnonCredsCredentialDefinitionState
): AnonCredsCredentialDefinitionState => {
  const newRecordsState = [...state.credentialDefinitions]
  newRecordsState.unshift(record)
  return {
    loading: state.loading,
    credentialDefinitions: newRecordsState,
  }
}

const updateRecord = (
  record: AnonCredsCredentialDefinition,
  state: AnonCredsCredentialDefinitionState
): AnonCredsCredentialDefinitionState => {
  const newRecordsState = [...state.credentialDefinitions]
  const index = newRecordsState.findIndex((r) => r.id === record.id)
  if (index > -1) {
    newRecordsState[index] = record
  }
  return {
    loading: state.loading,
    credentialDefinitions: newRecordsState,
  }
}

const removeRecord = (
  record: AnonCredsCredentialDefinition,
  state: AnonCredsCredentialDefinitionState
): AnonCredsCredentialDefinitionState => {
  const newRecordsState = state.credentialDefinitions.filter((r) => r.id !== record.id)
  return {
    loading: state.loading,
    credentialDefinitions: newRecordsState,
  }
}

const AnonCredsCredentialDefinitionContext = createContext<AnonCredsCredentialDefinitionState | undefined>(undefined)

export const useAnonCredsCredentialDefinitions = () => {
  const anonCredsCredentialDefinitionContext = useContext(AnonCredsCredentialDefinitionContext)
  if (!anonCredsCredentialDefinitionContext) {
    throw new Error(
      'useAnonCredsCredentialDefinition must be used within a AnonCredsCredentialDefinitionContextProvider'
    )
  }
  return anonCredsCredentialDefinitionContext
}

export const useAnonCredsCredentialDefinitionById = (id: string): AnonCredsCredentialDefinition | undefined => {
  const { credentialDefinitions } = useAnonCredsCredentialDefinitions()
  return credentialDefinitions.find((c) => c.id === id)
}

interface Props {
  agent?: Agent
}

const AnonCredsCredentialDefinitionProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<{
    credentialDefinitions: Array<AnonCredsCredentialDefinition>
    loading: boolean
  }>({
    credentialDefinitions: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const credentialDefinitionRepository = agent.dependencyManager.resolve(AnonCredsCredentialDefinitionRepository)
      const records = await credentialDefinitionRepository.getAll(agent.context)
      const credentialDefinitions: Array<AnonCredsCredentialDefinition> = records.map((r) => r.credentialDefinition)
      setState({ credentialDefinitions, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading && agent) {
      const credentialAdded$ = recordsAddedByType(agent, AnonCredsCredentialDefinitionRecord).subscribe(
        async (record) => {
          setState(addRecord(record.credentialDefinition, state))
        }
      )

      const credentialUpdate$ = recordsUpdatedByType(agent, AnonCredsCredentialDefinitionRecord).subscribe(
        async (record) => {
          setState(updateRecord(record.credentialDefinition, state))
        }
      )

      const credentialRemove$ = recordsRemovedByType(agent, AnonCredsCredentialDefinitionRecord).subscribe((record) =>
        setState(removeRecord(record.credentialDefinition, state))
      )

      return () => {
        credentialAdded$.unsubscribe()
        credentialUpdate$.unsubscribe()
        credentialRemove$.unsubscribe()
      }
    }
  }, [state, agent])

  return (
    <AnonCredsCredentialDefinitionContext.Provider value={state}>
      {children}
    </AnonCredsCredentialDefinitionContext.Provider>
  )
}

export default AnonCredsCredentialDefinitionProvider
