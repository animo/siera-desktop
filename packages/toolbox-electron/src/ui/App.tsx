import { HelloWorld } from '@animo/toolbox-ui'
import { useAgent } from '@aries-framework/react-hooks'
import React from 'react'

export function App() {
  const { agent } = useAgent()

  return (
    <>
      <div>
        <h1 className={'bg-gray-500 text-center'}>Hellloooo world</h1>
        <HelloWorld name={'World'} />
        <HelloWorld name={agent?.config.label ?? ''} />
      </div>
    </>
  )
}
