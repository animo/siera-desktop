import type { Agent, GetFormatDataReturn, IndyCredentialFormat } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { CredentialExchangeRecord } from '@aries-framework/core'
import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
} from '@aries-framework/react-hooks/build/recordUtils'
import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

type FormattedData = GetFormatDataReturn<[IndyCredentialFormat]> & {
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

const CredentialFormatDataContext = createContext<FormattedDataState | undefined>(undefined)

export const useCredentialsFormatData = () => {
  const credentialFormatDataContext = useContext(CredentialFormatDataContext)
  if (!credentialFormatDataContext) {
    throw new Error('useCredentialFormatData must be used within a CredentialFormatDataContextProvider')
  }
  return credentialFormatDataContext
}

export const useCredentialFormatDataById = (id: string): FormattedData | undefined => {
  const { formattedData } = useCredentialsFormatData()
  return formattedData.find((c) => c.id === id)
}

interface Props {
  agent?: Agent
}

const CredentialFormatDataProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<{
    formattedData: Array<FormattedData>
    loading: boolean
  }>({
    formattedData: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.credentials.getAll()
      const formattedData: Array<FormattedData> = []
      for (const record of records) {
        const formatData = await agent.credentials.getFormatData(record.id)
        formattedData.push({ ...formatData, id: record.id })
      }
      setState({ formattedData, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const credentialAdded$ = recordsAddedByType(agent, CredentialExchangeRecord).subscribe(async (record) => {
        const formatData = await agent!.credentials.getFormatData(record.id)
        setState(addRecord({ ...formatData, id: record.id }, state))
      })

      const credentialUpdate$ = recordsUpdatedByType(agent, CredentialExchangeRecord).subscribe(async (record) => {
        const formatData = await agent!.credentials.getFormatData(record.id)
        setState(updateRecord({ ...formatData, id: record.id }, state))
      })

      const credentialRemove$ = recordsRemovedByType(agent, CredentialExchangeRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        credentialAdded$.unsubscribe()
        credentialUpdate$.unsubscribe()
        credentialRemove$.unsubscribe()
      }
    }
  }, [state, agent])

  return <CredentialFormatDataContext.Provider value={state}>{children}</CredentialFormatDataContext.Provider>
}

export default CredentialFormatDataProvider
