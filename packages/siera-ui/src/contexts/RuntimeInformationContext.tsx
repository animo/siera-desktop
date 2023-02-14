import type { ReactNode } from 'react'

import React, { createContext, useContext } from 'react'

interface RuntimeInformation {
  version: string
  appType: 'desktop' | 'web'
}

const RuntimeInformationContext = createContext<RuntimeInformation>({} as RuntimeInformation)

export const useRuntimeInformation = () => {
  const runtimeInformation = useContext(RuntimeInformationContext)

  return {
    version: runtimeInformation.version,
    appType: runtimeInformation.appType,
    isDesktopApp: runtimeInformation.appType === 'desktop',
  }
}

interface RuntimeInformationProviderProps {
  children: ReactNode
  information: {
    version: RuntimeInformation['version']
    appType: RuntimeInformation['appType']
  }
}

export const RuntimeInformationProvider = ({ children, information }: RuntimeInformationProviderProps) => {
  return (
    <RuntimeInformationContext.Provider
      value={{
        appType: information.appType,
        version: information.version,
      }}
    >
      {children}
    </RuntimeInformationContext.Provider>
  )
}
