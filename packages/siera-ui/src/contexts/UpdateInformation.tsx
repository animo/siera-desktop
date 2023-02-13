import type { ReactNode } from 'react'

import React, { createContext, useContext, useEffect, useState } from 'react'

export interface UpdateInformation {
  version: string
  url: string
}
export interface UpdateInformationContext {
  setUpdateIgnored: (ignored: boolean) => void
  updateIgnored: boolean
  updateInformation?: UpdateInformation
}

const UpdateInformationContext = createContext<UpdateInformationContext>({} as UpdateInformationContext)

const useUpdateInformationContext = (): UpdateInformationContext => {
  return useContext(UpdateInformationContext)
}

export const useUpdateInformation = (): {
  available: boolean
  information?: UpdateInformationContext['updateInformation']
  ignored: UpdateInformationContext['updateIgnored']
  setIgnored: UpdateInformationContext['setUpdateIgnored']
} => {
  const { updateInformation, updateIgnored, setUpdateIgnored } = useUpdateInformationContext()

  return {
    available: !!updateInformation,
    information: updateInformation,
    ignored: updateIgnored,
    setIgnored: setUpdateIgnored,
  }
}

export interface UpdateInformationProviderProps {
  children: ReactNode
  checkUpdate: () => Promise<UpdateInformation | undefined>
}

export const UpdateInformationProvider = ({ children, checkUpdate }: UpdateInformationProviderProps) => {
  const [updateInformation, setUpdateInformation] = useState<UpdateInformation | undefined>(undefined)
  const [updateIgnored, setUpdateIgnored] = useState(false)

  useEffect(() => {
    checkUpdate().then((updateInformation) => {
      setUpdateInformation(updateInformation)
    })
  }, [])

  return (
    <UpdateInformationContext.Provider
      value={{
        updateInformation,
        updateIgnored,
        setUpdateIgnored,
      }}
    >
      {children}
    </UpdateInformationContext.Provider>
  )
}
