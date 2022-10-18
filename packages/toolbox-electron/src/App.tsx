import { useAgent } from '@aries-framework/react-hooks'
import React from 'react'

export function App() {
  const { agent } = useAgent()

  return (
    <>
      <div>
        <h1>Hellloooo world</h1>
      </div>
    </>
  )
}
