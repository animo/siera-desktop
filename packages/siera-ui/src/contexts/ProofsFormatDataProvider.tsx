import type { IndyProofFormat, Agent } from '@aries-framework/core'
import type { GetFormatDataReturn } from '@aries-framework/core/build/modules/proofs/models/ProofServiceOptions'
import type { PropsWithChildren } from 'react'

import { ProofExchangeRecord } from '@aries-framework/core'
import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
} from '@aries-framework/react-hooks/build/recordUtils'
import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

type FormattedData = GetFormatDataReturn<[IndyProofFormat]> & {
  id: string
}

type FormattedDataState = {
  formattedData: Array<FormattedData>
  loading: boolean
}

const addRecord = (record: FormattedData, state: FormattedDataState): FormattedDataState => {
  const newRecordsState = [...state.formattedData]
  newRecordsState.unshift(record)
  return {
    loading: state.loading,
    formattedData: newRecordsState,
  }
}

const updateRecord = (record: FormattedData, state: FormattedDataState): FormattedDataState => {
  const newRecordsState = [...state.formattedData]
  const index = newRecordsState.findIndex((r) => r.id === record.id)
  if (index > -1) {
    newRecordsState[index] = record
  }
  return {
    loading: state.loading,
    formattedData: newRecordsState,
  }
}

const removeRecord = (record: FormattedData, state: FormattedDataState): FormattedDataState => {
  const newRecordsState = state.formattedData.filter((r) => r.id !== record.id)
  return {
    loading: state.loading,
    formattedData: newRecordsState,
  }
}

const ProofFormatDataContext = createContext<FormattedDataState | undefined>(undefined)

export const useProofsFormatData = () => {
  const proofFormatDataContext = useContext(ProofFormatDataContext)
  if (!proofFormatDataContext) {
    throw new Error('useProofFormatData must be used within a ProofFormatDataContextProvider')
  }
  return proofFormatDataContext
}

export const useProofFormatDataById = (id: string): FormattedData | undefined => {
  const { formattedData } = useProofsFormatData()
  return formattedData.find((c) => c.id === id)
}

interface Props {
  agent?: Agent
}

const ProofFormatDataProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<{
    formattedData: Array<FormattedData>
    loading: boolean
  }>({
    formattedData: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.proofs.getAll()
      const formattedData: Array<FormattedData> = []
      for (const record of records) {
        const formatData = await agent.proofs.getFormatData(record.id)
        formattedData.push({ ...formatData, id: record.id })
      }
      setState({ formattedData, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading && agent) {
      const credentialAdded$ = recordsAddedByType(agent, ProofExchangeRecord).subscribe(async (record) => {
        const formatData = await agent.proofs.getFormatData(record.id)
        setState(addRecord({ ...formatData, id: record.id }, state))
      })

      const credentialUpdate$ = recordsUpdatedByType(agent, ProofExchangeRecord).subscribe(async (record) => {
        const formatData = await agent.proofs.getFormatData(record.id)
        setState(updateRecord({ ...formatData, id: record.id }, state))
      })

      const credentialRemove$ = recordsRemovedByType(agent, ProofExchangeRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        credentialAdded$.unsubscribe()
        credentialUpdate$.unsubscribe()
        credentialRemove$.unsubscribe()
      }
    }
  }, [state, agent])

  return <ProofFormatDataContext.Provider value={state}>{children}</ProofFormatDataContext.Provider>
}

export default ProofFormatDataProvider
